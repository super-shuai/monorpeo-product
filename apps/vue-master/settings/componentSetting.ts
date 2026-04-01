export default {
  table: {
    apiSetting: {
      // The field name of the current page 
      pageField: 'page',
      // Number of fields per page name 
      sizeField: 'pageSize',
      // The name of the data field returned by the interface 
      listField: 'list',
      // The interface returns the name of the total page field 
      totalField: 'pageCount',
      //Total field name 
      countField: 'itemCount',
    },
    //Default page count 
    defaultPageSize: 10,
    //Toggle the number of sets per page 
    pageSizes: [10, 20, 30, 40, 50],
  },
  upload: {
    //Consider different interface specifications 
    apiSetting: {
      // Set field name 
      infoField: 'data',
      // Image address field name 
      imgField: 'photo',
    },
    //Maximum uploaded image size 
    maxSize: 2,
    //Image upload type 
    fileType: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/svg+xml'],
  },
};
