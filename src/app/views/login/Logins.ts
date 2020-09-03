export class Login{
    public userName
    public companyName
    public aliasName
    public forgitKey
    public member="admin"
    public pass
    public login=["Create sucssesful"];
    public key
    public stuserName
    public stcompanyName
    public staliasName
    public stpass
    public stforgitKey
  
    public validateInput(){
        let state=true;

        if(this.userName==undefined||this.userName.length<7){
          state=false;
          this.stuserName=true;
        }else  this.stuserName=false;

        if(this.pass==undefined||this.pass.length<7){
            state=false;
            this.stpass=true;
          }else  this.stpass=false;
      
       
        return state;
      }

      static setLogin(){
        return new Login();
      }
      

}