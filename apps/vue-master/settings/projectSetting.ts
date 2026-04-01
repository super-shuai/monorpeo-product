const setting = {
  //Navigation mode  vertical Left menu mode  horizontal Top menu mode 
  navMode: 'vertical',
  //Navigation style  dark Dark sidebar  light White sidebar  header-dark Dark top bar 
  navTheme: 'dark',
  // Whether the device is in mobile mode 
  isMobile: false,
  //upper 
  headerSetting: {
    //Background color 
    bgColor: '#fff',
    //immobilization upper 
    fixed: true,
    //Show reload button 
    isReload: true,
  },
  //Page footer 
  showFooter: true,
  //multi-label 
  multiTabsSetting: {
    //Background color 
    bgColor: '#fff',
    //Show or not 
    show: true,
    //immobilization multi-label 
    fixed: true,
  },
  //menu 
  menuSetting: {
    //Minimum width 
    minMenuWidth: 64,
    //menu breadth 
    menuWidth: 200,
    //immobilization menu 
    fixed: true,
    //segmentation menu 
    mixMenu: false,
    //Trigger the width of the moving side sidebar 
    mobileWidth: 800,
    // fold menu 
    collapsed: false,
  },
  //crumbs 
  crumbsSetting: {
    //Show or not 
    show: true,
    //Display icon 
    showIcon: false,
  },
  //menu Permission mode  FIXED Front-end fixed route   BACK Dynamic acquisition 
  permissionMode: 'BACK',
  //Whether to enable route animation 
  isPageAnimate: true,
  //Route animation type 
  pageAnimateType: 'zoom-fade',
}
export default setting
