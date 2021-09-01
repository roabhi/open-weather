export class Fetch {

    async apiCall(_url: RequestInfo):Promise<JSON>{


        const call = await fetch(_url),
              res = await call.json()
    
       return res
    }

}

