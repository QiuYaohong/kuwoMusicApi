// 添加统一的返回结果方法
module.exports = function(req, res, next){
	res.sendResult = function(data,code,message) {
		var fmt = req.query.fmt ? req.query.fmt : "rest"
		if(fmt == "rest") {
			res.json(
			{
				code: code,
				message: message,
				result : data,
				success: code === 200 ? true : false,
				timestamp: new Date().getTime()
			})
		}
	}
	next()
}