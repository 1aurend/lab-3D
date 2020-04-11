// Define environment variables
function getEnvironment() {
  var labColumns = {
    sheet: 1,
    id: 4,
    title: 5,
    tree: 6,
    def: 7,
    lastAvail: 8,
    nid : 9,
    ntitle: 10
  }
  var specimenColumns = {
    sheet: 0,
    sid: 1,
    type: 3,
    resource: 2,
    taxon: 4,
    description: 5,
    institution: 6,
    people: 7
  }
  var nodeColumns = {
    sheet: 2,
    nid: 0,
    ntitle: 1,
    sid: 2,
    defaultsid : 3,
  }
  var contentColumns = {
    sheet: 3,
    nid: 0,
    ntitle: 1,
    md: 2
  }
 var environment = {
   spreadsheetID: "1CzUoaHI2NQf7jrNAsTBuMDY8NvksdnyF_Cszb-nRg74",
   firebaseUrl: "https://oeb-126.firebaseio.com/",
   labCols: labColumns,
   specCols: specimenColumns,
   nodeCols: nodeColumns,
   contentCols: contentColumns
 }
 return environment;
}

// ENTRY POINT: Initialize
function initialize(e) {
  deleteTriggers();
  var environment = getEnvironment()
  createSpreadsheetEditTrigger(environment.spreadsheetID)
  var ss = SpreadsheetApp.openById(environment.spreadsheetID)
  SpreadsheetApp.setActiveSpreadsheet(ss);
  var sheets = ss.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    SpreadsheetApp.setActiveSheet(sheets[i]);
    importSheet(sheets[i]);
 }
}


// Create a Google Sheets onchange trigger for the specific sheet
function createSpreadsheetEditTrigger(sheetID) {
 var triggers = ScriptApp.getProjectTriggers();
 var triggerExists = false;
 for (var i = 0; i < triggers.length; i++) {
   if (triggers[i].getTriggerSourceId() == sheetID) {
     triggerExists = true;
     break;
   }
 }

 if (!triggerExists) {
   var spreadsheet = SpreadsheetApp.openById(sheetID);
   ScriptApp.newTrigger("importSheet")
     .forSpreadsheet(spreadsheet)
     .onOpen()
     .create();
 }
}

// Delete all the existing triggers for the project
function deleteTriggers() {
 var triggers = ScriptApp.getProjectTriggers();
 for (var i = 0; i < triggers.length; i++) {
     ScriptApp.deleteTrigger(triggers[i]);
   }
}

// Import Lab data
function getLabs(sheet) {
  var columns = getEnvironment().labCols
  var data = sheet.getDataRange().getValues();
  var dataToImport = {};
  for (var i = 1; i < data.length; i++) {
    labKey = data[i][4];
    if (!(labKey in dataToImport)) {
//      Logger.log("new lab, making top-level key");
      dataToImport[labKey] = {
        "title":data[i][columns.title],
        "tree":data[i][columns.tree],
        "default":data[i][columns.def],
        "lastAvailable":data[i][columns.lastAvail],
        "nodes":{}
      };
      dataToImport[labKey]["nodes"][data[i][columns.nid]]={"title":data[i][columns.ntitle]}
    } else {
//      Logger.log("assigning to existing lab")
      dataToImport[labKey]["nodes"][data[i][columns.nid]]={"title":data[i][columns.ntitle]}
    }
  }
  return dataToImport
}

// Import specimen data
function getSpecimens(sheet) {
  var columns = getEnvironment().specCols;
  var data = sheet.getDataRange().getValues();
  var dataToImport = {};
  for (var i = 1; i < data.length; i++) {
    specimenKey = data[i][columns.sid].slice(1);
    if (!(specimenKey in dataToImport)) {
//      Logger.log("new specimen, making key");
      dataToImport[specimenKey] = {
        "a":data[i][columns.sid],
        "type":data[i][columns.type],
        "resource":data[i][columns.resource],
        "metadata":{
          "taxon":data[i][columns.taxon],
          "description":data[i][columns.description],
          "attribution":{
          "institution":data[i][columns.institution],
          "people":data[i][columns.people]
          }
        }
      };
    }
  }
  return dataToImport
}

// Import node data
function getNodes(sheet) {
  var columns = getEnvironment().nodeCols;
  var data = sheet.getDataRange().getValues();
  var dataToImport = {};
  for (var i = 1; i < data.length; i++) {
    nodeKey = data[i][columns.nid];
    if (!(nodeKey in dataToImport)) {
//      Logger.log("new node, making key");
      dataToImport[nodeKey] = {
        "ntitle":data[i][columns.ntitle],
        "default":data[i][columns.defaultsid].slice(1),
        "sids":[]
        }
      dataToImport[nodeKey]["sids"].push(data[i][columns.sid].slice(1))
    } else {
//      Logger.log("assigning to existing node")
      dataToImport[nodeKey]["sids"].push(data[i][columns.sid].slice(1))
    }
  }
  return dataToImport
}


// Import content data
function getContent(sheet) {
  Logger.log("starting to get content")
  var columns = getEnvironment().contentCols;
  var data = sheet.getDataRange().getValues();
  var dataToImport = {};
  for (var i = 1; i < data.length; i++) {
    nodeKey = data[i][columns.nid];
    Logger.log(nodeKey)
    if (!(nodeKey in dataToImport)) {
//      Logger.log("new content, making key");
      dataToImport[nodeKey] = {
        "ntitle":data[i][columns.ntitle],
        "md":data[i][columns.md]
      }
    }
  }
  return dataToImport
}


// Import each sheet when there is a change
function importSheet(){
  var sheet = SpreadsheetApp.getActiveSheet()
  var name = sheet.getName();
  var dataToImport = {}
  switch (name) {
    case 'specimens':
      Logger.log("importing specimens")
      dataToImport = getSpecimens(sheet)
      break;
    case 'labs':
      Logger.log("importing labs")
      dataToImport = getLabs(sheet)
      break;
    case 'nodes':
      Logger.log("importing nodes")
      dataToImport = getNodes(sheet)
      break;
    case 'content':
      Logger.log("importing content")
      dataToImport = getContent(sheet)
      break;
    default:
      Logger.log('Not sure what to do with this sheet?')
  }
  var token = ScriptApp.getOAuthToken();
  var firebaseUrl =
      getEnvironment().firebaseUrl + "/" + name;
  var base = FirebaseApp.getDatabaseByUrl(firebaseUrl, token);
  base.setData("", dataToImport);
  Logger.log('successfully set: '+name)
}
