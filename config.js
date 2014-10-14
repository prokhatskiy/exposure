module.exports = function() {
    return {
        TITLE : 'Exposure',

        CREATE_JSON_FILE : true,
        SAVE_TO_DB : true,
        GET_FROM_DB : true,

        ROUTES : {
            INDEX : '/',
            GALLERY_API : '/services/gallery/:page',
            DEPLOY_API : '/deploy',
            PAGE_API : '/services/page/:id'
        },

        DB : {
            SERVER : 'ds043210.mongolab.com:43210',
            NAME : 'exposure',
            PARAMS : '?replicaSet=rs-ds043210',
            USER : 'prokhatskyi',
            PASSWORD : 'Hf556Cfds099der'
        },

        FLICKR : {
            PAGES : 500,
            START_PAGE : 1,
            KEY : '419e35e4aaec098faa26c3abc6bad103',
            SECRET : 'cc9ae63b01642c7a',
            USER_ID : '90529052%40N05'
        },

        GALLERY : {
            FOLDER_PATH : 'public/services',
            FOLDER_NAME : 'gallery',
            FILE_PREFIX : 'gallery-',
            ITEMS_PER_PAGE : 1
        },

        PAGE : {
            FOLDER_PATH : 'public/services',
            FOLDER_NAME : 'pages',
            FILE_PREFIX : 'page-'
        }
    }
}();