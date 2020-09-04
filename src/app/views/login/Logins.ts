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

        if(this.companyName==undefined||this.companyName.length<4){
          state=false;
          this.stcompanyName=true;
        }else  this.stcompanyName=false;

        if(this.aliasName==undefined||this.aliasName.length<7){
          state=false;
          this.staliasName=true;
        }else  this.staliasName=false;

        if(this.userName==undefined||this.userName.length<7){
          state=false;
          this.stuserName=true;
        }else  this.stuserName=false;


        if(this.pass==undefined||this.pass.length<7){
            state=false;
            this.stpass=true;
          }else  this.stpass=false;


          if(this.forgitKey==undefined||this.forgitKey.length<5){
            state=false;
            this.stforgitKey=true;
          }else  this.stforgitKey=false;
      
       
        return state;
      }

      static setLogin(){
        return new Login();
      }
      

}