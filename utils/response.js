const successResponse = (message, data= null)=>{
    return {
        status: 'success',
        message,
        data
    }
}

const errorResponse = (message)=>{
    return{
        status:'error',
        message
    }
}

module.exports = { successResponse, errorResponse}