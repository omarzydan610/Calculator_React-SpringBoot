import './ButtonStyle.css'
import axios from "axios";
function Button({data,className,input,setInput,output,setOutput,lstUsed,setlstUsed}){

    const toggle=()=>{
        let inputCopy=String(input);
        let lastOp=-1;
        for(let i=inputCopy.length-1;i>=0;i--){
            if(inputCopy[i]==='+'||inputCopy[i]==='-'||inputCopy[i]==='*'||inputCopy[i]==='/'){
                lastOp=i;
                break
            }
        }
        if(inputCopy[lastOp]==='-'){
            if(inputCopy[lastOp-1]==='+'||inputCopy[lastOp-1]==='*'||inputCopy[lastOp-1]==='/'){
                inputCopy=inputCopy.slice(0, lastOp) +inputCopy.slice(lastOp + 1)
            }
            else{
                inputCopy=inputCopy.slice(0, lastOp) +'+'+inputCopy.slice(lastOp + 1)
            }
        }
        else if(inputCopy[lastOp]==='+'){
            inputCopy=inputCopy.slice(0, lastOp) +'-'+inputCopy.slice(lastOp + 1)
        }
        else{
            inputCopy=inputCopy.slice(0, lastOp+1) + "-"+inputCopy.slice(lastOp + 1)
        }
        if(inputCopy[0]==='+'){
            inputCopy=inputCopy.slice(1)
        }
        return inputCopy;
    }
    
    const handleClick=async()=>{
        if(data==='='){
            if(lstUsed==='='){
                return
            }
            try {
                const response = await axios.get(`http://localhost:8080/api/calculator/${"equal"}`, {
                params: { expression:input},
                });
                setOutput(response.data);
            } catch (error) {
                if(error.response){
                    setOutput(error.response.data);
                }
                else{
                    setOutput("server error")
                }
            }
        }
        else if(data==='√'||data==='x²'||data==='1/x'){
            let flag=0;
            if(output!==''){
                setInput(output);
                flag=1;
            }
            try {
                let op;
                if(data==='√'){
                    op='root'
                }
                else if(data==='x²'){
                    op='exp2'
                }
                else{
                    op='flip'
                }
                const response = await axios.get(`http://localhost:8080/api/calculator/${op}`, {
                params: { param:(flag===0?input:output)},
                });
                setOutput(response.data);
            } catch (error) {
                if(error.response){
                    setOutput(error.response.data);
                }
                else{
                    setOutput("server error")
                }
            }
        }
        else if(data==='C'||data==='CE'){
            setInput('');
            setOutput('');
        }
        else if(data==='←'){
            setInput(String(input).slice(0, -1));
            setOutput('');
        }
        else if(data==='+/-'){
            setInput(toggle)
        }
        else{
            if(output===''){
                setInput(input+data);
            }
            else{
                if(data==='+'||data==='-'||data==='*'||data==='/'){
                    setInput(output+data);
                    setOutput('');
                }
                else{
                    setInput(data);
                    setOutput('');
                }
            }
        }
        setlstUsed(data)
    }
    return(
        <button className= {`button ${className}`} onClick={handleClick}>
            {data}
        </button>
    )
}
export default Button;
