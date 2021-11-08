const scriptCache = CacheService.getScriptCache();
const userCache = CacheService.getUserCache();
const documentCache = CacheService.getDocumentCache();

function putDataInCache() {
  Logger.log(scriptCache);
  Logger.log(userCache);
  Logger.log(documentCache);

  scriptCache.put('todaysArticle', 'The sky is cloudy :(');
  userCache.put('bankBalance', '3000');
}

function retrieveDataFromCache() {
  const todaysArticle = scriptCache.get('todaysArticle');
  const bankBalance = userCache.get('bankBalance');

  Logger.log(todaysArticle);
  Logger.log(bankBalance);
}
