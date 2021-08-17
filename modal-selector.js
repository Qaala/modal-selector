/**
* Dependencies:
*     - jQuery
*     - Bootstrap 4
*     - FontAwesome
**/
(function ($){
  $.fn.ModalSelector = function(options){
    let settings = $.extend({
      url: null,
      data: null,
      nameProperty: "name",
      idProperty: "id",
      childrenProperty: "children",
      _: {
        id: Math.floor(Math.random()*10000),
        modalParent: "body"
      },
      localization: {
        search: "Ara"
      },
      onSelect: null
    }, options);

    const modalTrigger = $(this);
    let modal = null;

    _init();

    async function _init(){
      if(settings.url === null && settings.data === null)
        throw Exception("Url veya data property'si girilmiş olmalıdır.");
      _setModalTrigger();
    }

    function _setModalTrigger(){
      modalTrigger.on("click", _modalTriggerOnClick);
    }
    async function _modalTriggerOnClick(event){
      if(settings.url !== null) settings.data = await _getDataFromUrl();
      modal = _createModal();
      _showModal();
    }

    function _showModal(){
      if(modal === null) return;
      modal.modal("show");
    }
    function _createModal(){
      $(_modalHtml()).appendTo(settings._.modalParent);
      _setSearchKeyUpEvent();
      _setSelectEvent();
      let modal = $("#modal-"+settings._.id);
      return modal;
    }
    function _modalHtml(){
      return `<div class="modal fade modal-selector" id="modal-${settings._.id}" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-body">
                    <div class="search-area">
                      <div class="input-group mb-3">
                        <input id="modal-selector-search-${settings._.id}" type="text" class="form-control" placeholder="${settings.localization.search}">
                        <div class="input-group-append">
                          <span class="input-group-text" id="basic-addon2"><i class="fas fa-search"></i></span>
                        </div>
                      </div>
                    </div>
                    <ul class="list-group">
                      ${(function insertData(data, index){
                        let html = ``;
                        data.forEach(item => {
                          let isLastChild = true;
                          if(item.hasOwnProperty(settings.childrenProperty)) isLastChild = false;
                          html += `<li class="list-group-item modal-selector-item ${isLastChild ? 'last-item' : ''}" data-data='${JSON.stringify(item)}'
                            style="padding-left: ${index}em"><i class="fas ${isLastChild ? 'fa-play' : 'fa-level-up-alt fa-rotate-90'} mr-3"></i>
                            ${item[settings.nameProperty]}</li>`;
                          if(!isLastChild){
                            index++;
                            html += `<ul class="list-group">`;
                            item[settings.childrenProperty].forEach(children => {
                              html += insertData([children], index);
                            });
                            index--;
                            html += `</ul>`;
                          }
                        });
                        return html;
                      })(settings.data, 1)}
                    </ul>
                    </div>
                  </div>
                </div>
              </div>`;
    }

    function _setSearchKeyUpEvent(){
      _getSearchInput().on("keyup", _$modalSearchOnKeyUp);
    }
    function _$modalSearchOnKeyUp(event){
      _search(_getSearchInput().val());
    }
    function _search(searchValue){
      searchValue = searchValue.toLowerCase();
      let listItems = $(".modal-selector-item");
      if(searchValue === '') {
          listItems.show();
          return;
      }

      let childItems = [];

      for (let listItem of listItems) {
        listItem = $(listItem);
        let itemText = listItem.text().trim().toLowerCase();
        if(itemText.includes(searchValue)){
          listItem.show();
        }
        else {
          listItem.hide();
        }
      }
    }
    function _getSearchInput(){
      return $("#modal-selector-search-"+settings._.id);
    }

    function _setSelectEvent(){
      _getLastItems().on("click", _$listItemOnClick);
    }

    function _$listItemOnClick(e){
      if(settings.onSelect !== null) settings.onSelect(e, $(this).data("data"), modal);
    }

    function _getLastItems(){
      return $(".modal-selector .list-group-item.last-item");
    }

    async function _getDataFromUrl(){
      let response = await fetch(settings.url);
      return response.json();
    }
  }
}(jQuery))
