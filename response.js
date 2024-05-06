const response = (statusCode, data , message, res)=>{
    res.status(statusCode).json({
        payload : {
            status_code : statusCode,
            datas : data,
        },
    Message:message,
    pagination:{
        prev:'',
        next:'',
        max:''
    }
    })
}

module.exports = response
