import Axios from "axios";
let axios = Axios['default']
import validator from './validator.mjs'
import parser from './json.ld.mjs'
let conceptNET = {
	method: 'get',
	url: "https://api.conceptnet.io"
}
export default function stdrpc(_config) {
	if(typeof _config !== "object")
		throw new Error("Expected 'config' to be an object");

	const config = {
		url: "http://localhost:8332",
		methodTransform: a => a,
		..._config
	};

	return new Proxy({}, {
		set(target, method, handler) {
			console.log('set: ', {
				handler: handler,
				method: method,
				target: target
			})
			target[method] = handler; // allow overwriting of methods for testing
		},

		has() {
			return true; // for sinon spies/stubs testing
		},

		get(target, method) {
			console.log('get: ', {
				target: target,
				method: method
			})
			if(typeof target[method] === "function")
				return target[method];

			return async (...params) => {
				method = config.methodTransform(method);

				const requestData = {
					jsonrpc: "2.0",
					method,
					params,
					id: Date.now()
				};

				const requestConfig = {};

				if(typeof config.username === "string" && typeof config.password === "string")
					requestConfig.auth = {
						username: config.username,
						password: config.password
					};

        if(typeof config.timeout === "number")
          requestConfig.timeout = config.timeout;
					try {
						if(requestData.method) {
							if(!validator(requestData.method)) {
								const {data}  = await axios(`${conceptNET.url}${requestData.method}${requestData.params}`);
								if(data.error) {
									throw new Error(`${data.error.code}: ${data.error.message}`);
								}
								return await parser(data);
							} else {
								const { data } = await axios.post(config.url, requestData, requestConfig);

								if(data.error) {
									throw new Error(`${data.error.code}: ${data.error.message}`);
								}
								return data.result;
							}
						}
					}catch (e) {
						return {
							status: false,
							success: false,
							error: e.config.data,
							"import.meta": import.meta.url
						};
					}

			};
		}
	});
};
