$("#multi-column-ordering").DataTable({
  oLanguage: {
    oPaginate: {
      sPrevious:
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',
      sNext:
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>',
    },
    sInfo: "Showing page _PAGE_ of _PAGES_",
    sSearch:
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
    sSearchPlaceholder: "Search...",
    sLengthMenu: "Results :  _MENU_",
  },
  stripeClasses: [],
  lengthMenu: [7, 10, 20, 50],
  pageLength: 7,
  columnDefs: [
    {
      targets: [0],
      orderData: [0, 1],
    },
    {
      targets: [1],
      orderData: [1, 0],
    },
    {
      targets: [4],
      orderData: [4, 0],
    },
  ],
});
