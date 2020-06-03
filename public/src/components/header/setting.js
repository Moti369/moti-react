import ajax from 'ajax';

class SettingStore {
    
    logout = ()=>{
        ajax.post('/login/systemExit').then(function(data){
            window.location = process.env.URL.login;
        });
    }

    changeLanguage = (lang)=>{
        ajax.post('/login/changeLanguage', {
            language: lang
        }).then(function(data){
            window.location.reload();
        });
    }
}

export default new SettingStore();