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

 const dateFormat = (oldDate) => {
     if (!oldDate) {
          console.log('wrong date')
        }
       
        const date = new Date(new Date(oldDate).toISOString());
     console.log(oldDate)
     console.log(date)
       const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
       return new Intl.DateTimeFormat('en-US', {
          dateStyle: 'long',
          timeStyle: 'short'
       }).format(date);
 }
 export {customCatalogKey , dateFormat}