function doGet() {
  return HtmlService.createTemplateFromFile('index.html').evaluate().setTitle('CDC Vaccination Numbers');
}

function includeExternalFile(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getVaccinationCountByRegion(region) {

  // First check to see if data is in cache
  const cacheStart = new Date();
  const scriptCache = CacheService.getScriptCache();
  let data = scriptCache.get(region);

  if (data) {
    const cacheEnd = new Date();
    return [...data.split(','), `Reading from the cache took: ${(cacheEnd - cacheStart) / 1000} seconds`];
  }

  // If data is not in cache, retrieve it from database
  const start = new Date();
  const spreadsheet = SpreadsheetApp.openById('1LTNZmZlGsw0duSk8qfCmQFQ0v0ba0pbTuaM1JZyZha0');
  const sheet = spreadsheet.getSheetByName('data');

  const spreadsheetData = sheet.getDataRange().getValues();
  for (let row of spreadsheetData) {
    if (row[2] === region) {
      data = [row[4], row[5], row[13]];
      break;
    }
  }
  const end = new Date();

  // Before returning the data to the user, store it in the cache for subsequent requests
  scriptCache.put(region, data, 10);
  return [...data, `Reading from the database took: ${(end - start) / 1000} seconds`];
}


function otherFunctions() {
  const scriptCache = CacheService.getScriptCache();

  scriptCache.putAll({
    'TX': '5000',
    'NM':'7000',
    'OK': '4500'
  });

  Logger.log(scriptCache.getAll(['TX', 'NM', 'OK']));
  
  scriptCache.remove('NM');
  Logger.log(scriptCache.get('NM'));

  scriptCache.removeAll(['TX', 'OK']);
  Logger.log(scriptCache.getAll(['TX', 'NM', 'OK']));

}
