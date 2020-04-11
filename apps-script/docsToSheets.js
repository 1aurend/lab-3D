// Define environment variables
function getEnvironment() {
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
    md: 1
  }
 var environment = {
   docID: "1i2qKaFzIFp25LFte0VKnLXVMcq-5mXu9pgwWrkILIYY",
   spreadsheetID: "1CzUoaHI2NQf7jrNAsTBuMDY8NvksdnyF_Cszb-nRg74",
   nodeCols : nodeColumns,
   contentCols: contentColumns
 };
 return environment;
}

// ENTRY POINT: Initialize
function initialize(e) {
  deleteTriggers();
  createDocsEditTrigger(getEnvironment().docID);
  writeDataToSheet();
}

// Get data from doc for import
function getDataForSheet() {
  var environment = getEnvironment()
  var doc = DocumentApp.openById(environment.docID)
  sectionArray = splitSectionsOnH1(doc);
  var parsedArray = []
  sectionArray.forEach(section => parsedArray.push(parseSection(doc, section)))
  return parsedArray
}

// Write data to sheet
function writeDataToSheet() {
  var environment = getEnvironment()
  var data = getDataForSheet();
  var ss = SpreadsheetApp.openById(environment.spreadsheetID);
  SpreadsheetApp.setActiveSpreadsheet(ss);
  var sheets = ss.getSheets();
  var nodeSheet = sheets[environment.nodeCols.sheet]
  nodeSheet.getRange(2, 1, nodeSheet.getMaxRows(), nodeSheet.getMaxColumns()).clear()
  var contentSheet = sheets[environment.contentCols.sheet]
  contentSheet.getRange(2, 1, contentSheet.getMaxRows(),contentSheet.getMaxColumns()).clear()
  var nodeData = []
  var contentData = []
  for (var datum of data) {
    contentData.push([datum.id, datum.title, datum.body])
    for (var link of datum.a){
      nodeData.push([datum.id, datum.title, link, datum.defaultA])
    }
  }
  var nodeRange = nodeSheet.getRange(2, 1, nodeData.length, 4)
  nodeRange.setValues(nodeData)
  var contentRange = contentSheet.getRange(2, 1, contentData.length, 3)
  contentRange.setValues(contentData)
}

// Create a Google Docs onchange trigger for the specific document
function createDocsEditTrigger(docID) {
 var triggers = ScriptApp.getProjectTriggers();
 var triggerExists = false;
 for (var i = 0; i < triggers.length; i++) {
   if (triggers[i].getTriggerSourceId() == docID) {
     triggerExists = true;
     break;
   }
 }

 if (!triggerExists) {
   var document = DocumentApp.openById(docID);
   ScriptApp.newTrigger("writeDataToSheet")
     .forDocument(document)
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

// Splits a Google doc on H1, returns array of ranges
function splitSectionsOnH1(doc) {
  var body = doc.getBody();
  var searchType = DocumentApp.ElementType.PARAGRAPH;
  var searchH1 = DocumentApp.ParagraphHeading.HEADING1;
  var searchResult = null;
  var storedSections = [];
  var nodeBuffer = {"title":null,"start":null,"end":null}
  while (searchResult = body.findElement(searchType, searchResult)) {
    var res = searchResult.getElement()
    var par = res.asParagraph();
    if (par.getHeading() == searchH1 && res.getText().length > 0) {
      if (nodeBuffer.end != null){
        var rangeBuilder = doc.newRange()
        rangeBuilder.addElementsBetween(nodeBuffer.start.getElement(), nodeBuffer.end.getElement())
        var newSection = rangeBuilder.build()
        storedSections.push({"title":nodeBuffer.title,"content":newSection});
        nodeBuffer = {"title":null,"start":null,"end":null}
      }
      nodeBuffer.start=searchResult
      nodeBuffer.title=searchResult.getElement().getText().trim()
    }
    else if (searchResult.getElement().getText().length>0) {
      nodeBuffer.end=searchResult
    }
  }
  var rangeBuilder = doc.newRange()
  rangeBuilder.addElementsBetween(nodeBuffer.start.getElement(), nodeBuffer.end.getElement())
  var newSection = rangeBuilder.build()
  storedSections.push({"title":nodeBuffer.title,"content":newSection});
  return storedSections
}

// Parses ranges into Markdown
function parseSection(doc, section){
  var parsed = {"id":section.title.replace(/[. ]/g,'-'),
                "title":section.title,
                "li":[],
                "body":null,
                "a":[],
                "defaultA":null}
  var searchH1 = DocumentApp.ParagraphHeading.HEADING1;
  var searchH2 = DocumentApp.ParagraphHeading.HEADING2;
  var searchH3 = DocumentApp.ParagraphHeading.HEADING3;
  var searchH4 = DocumentApp.ParagraphHeading.HEADING4;
  var searchH5 = DocumentApp.ParagraphHeading.HEADING5;
  var searchH6 = DocumentApp.ParagraphHeading.HEADING6;
  var searchLi = DocumentApp.ElementType.LIST_ITEM;
  var searchP = DocumentApp.ParagraphHeading.NORMAL;
  var range = section.content.getRangeElements();
  var bodyArray = [];
  var linksArray = [];
  for (var chunk of range) {
    var element = chunk.getElement();
    var text = element.getText();
    if (text.length > 0){
      var textelem = element.editAsText();
      var output = [];
      var indices = textelem.getTextAttributeIndices();
      for (var i = 0; i < indices.length; i++) {
        var textPart = (i == indices.length - 1 ? text.slice(indices[i]) : text.slice(indices[i], indices[i+1]));
        if (textPart.length > 1){
          var strikethrough = textelem.isStrikethrough(indices[i]);
          var bold = textelem.isBold(indices[i]);
          var italic = textelem.isItalic(indices[i]);
          var url = textelem.getLinkUrl(indices[i]);
          textPart = (url ? '[' + textPart.trim() + '](' + url + ')' : textPart);
          textPart = (strikethrough ? '~~'+textPart.trim()+'~~' : textPart);
          textPart = (bold ? '__'+textPart.trim()+'__' : textPart);
          textPart = (italic ? '*'+textPart.trim()+'*': textPart);
          textPart = ' '+textPart;
          output.push(textPart);
          if (url != null && linksArray.indexOf(url) === -1) {linksArray.push(url)};
        } else {
          output.push(textPart);
        };
      };
      var result = output.join('').replace(/  /g,' ')
      .replace(/ [’”,.]/g,match => match.trimStart())
      .replace(/[‘“] /g,match => match.trimEnd())
      .trimStart();
      if (element.getType() == searchLi) {
        parsed.li.push(result)
        bodyArray.push('+ '+result)
      } else {
        var par = element.asParagraph();
        var heading = par.getHeading();
        switch (heading) {
          case searchH1:
            result = '# '+result;
            break;
          case searchH2:
            result = '## '+result;
            break;
          case searchH3:
            result = '### '+result;
            break;
          case searchH4:
            result = '#### '+result;
            break;
          case searchH5:
            result = '##### '+result;
            break;
          case searchH6:
            result = '###### '+result;
            break;
          default:
            break;
        }
        bodyArray.push(result);
      }
    }
  }
  parsed.body=bodyArray.join('\r\n\r\n')
  parsed.a=linksArray
  parsed.defaultA=linksArray[0]
//  Logger.log("id: "+parsed.id)
//  Logger.log("title: "+parsed.title)
//  Logger.log("body: "+parsed.body)
//  Logger.log("li: "+parsed.li)
//  Logger.log("a: "+parsed.a)
  return parsed
}
