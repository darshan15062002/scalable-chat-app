import { Server } from "socket.io";
import Redis from 'ioredis';

const redisUri = "rediss://default:AVNS_CFM_w5QJxX_qE-0mF_R@redis-11cfc821-darshanjain15062002-905d.a.aivencloud.com:13784"

const pub =new Redis(redisUri)
const sub = new Redis(redisUri)




class SocketService{
    private _io:Server
    constructor(){
        console.log("init socket service");
        this._io = new Server({
            cors:{
                origin:"*",
                allowedHeaders:["*"]
            }
        })
        sub.subscribe("MESSAGE")
    }

    public initListener(){
        const io=this._io
        console.log("socket is listening....");

        io.on("connect",(socket)=>{
            console.log(`new socket connected: ${socket.id}`);
            socket.on("event:message", async({message}:{message:string})=>{
                console.log("new message received",message);
                // publish message to redis
                await pub.publish("MESSAGE",JSON.stringify({message}))
            })
            
        })

        sub.on('message',(channel,message)=>{
         if(channel==="MESSAGE"){
                 io.emit("message",message)
        }})


    
        
       
    }
    get io(){
        return this._io
    }
}

export default SocketService