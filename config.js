module.exports = function() {
    return {
        TITLE : 'Exposure',

        ROUTES : {
            INDEX : '/',
            GALLERY_API : '/services/gallery/*',
            DEPLOY_API : '/deploy'
        },

        DB : {
            SERVER : 'ds043210.mongolab.com:43210/exposure',
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
            FOLDER_NAME : 'gallery',
            FILE_PREFIX : 'page-'
        }
    }
}();