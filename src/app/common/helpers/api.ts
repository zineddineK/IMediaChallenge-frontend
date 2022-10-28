/* eslint-disable @typescript-eslint/no-explicit-any */

// eslint-disable-next-line max-len
const baseUrl: any = process.env.REACT_APP_API_PATH

async function fetcher(input: RequestInfo, init?: RequestInit, isBlob?: boolean): Promise<any> {
	const res = await fetch(`${baseUrl}${input}`, init)
	if (res.status === 401) {
		window.location.replace('/')
	} else if (res.status === 503) {
		window.location.replace('/503')
	}
	//
	// if (res.status >= 400 && res.status <= 511) {
	// 	throw new Error('API ERROR')
	// }
	if (isBlob && res.status >= 100 && res.status < 400) {
		return res.blob()
	}
	return res.json()
}

const request = async (url: string, params: RequestInit, isBlob?: boolean): Promise<any> => {
	try {
		return await fetcher(url, params, isBlob)
	} catch (error) {
		return {
			success: false,
			error,
		}
	}
}

export { fetcher, request }
