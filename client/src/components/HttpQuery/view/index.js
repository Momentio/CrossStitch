import React, { PureComponent } from 'react';
import "./index.css";

class HttpQuery extends PureComponent {
  constructor(props){
    super(props);
  };
  
  render() {
    if(!this.props.gModel || !this.props.gModel.gValue) return false;

    let model = this.props.gModel;
    let value = model.gValue;

    let status;
    let wait = true;
    let complete = true;

    if(value.isLoading){
      status = "Загрузка";
    }
    
    if(value.isUploading){
      status = "Добавление";
    }
    
    if(value.status == false){
      status = "Сервер недоступен";
      wait = false;
      complete = false;
    }

    if(value.error){
      status = value.statusCodesList[value.error] || "Неизвестная ошибка";
      wait = false;
      complete = false;
    }

    if(status){
      return (
        <div className={`httpQuery text-center`}>
          <b className={
              `httpQuery__text ${(wait) ? "wait" : false}`
            }>{status}</b>
        </div>
      );
    }

    return this.props.children;
  }
}

export default HttpQuery;