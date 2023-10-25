const customCatalogKey = (catalog) => {
    let withKeyCatalogs = {}
    if(catalog.first_catalog){
         withKeyCatalogs.first_catalog = catalog.first_catalog
    }
 
    if(catalog.second_catalog){
         withKeyCatalogs.second_catalog = catalog.second_catalog
    }
 
    if(catalog.third_catalog){
         withKeyCatalogs.third_catalog = catalog.third_catalog
    }
 
    return withKeyCatalogs
 }

 export {customCatalogKey}