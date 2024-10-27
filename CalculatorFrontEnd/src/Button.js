import './ButtonStyle.css'
import axios from "axios";
function Button({data,className,input,setInput,output,setOutput,lstUsed,setlstUsed}){

    const toggle=()=>{
        let inputCopy=String(input);
        let lastOp=-1;
        let closedParentheses=0;
        for(let i=inputCopy.length-1;i>=0;i--){
            if(inputCopy[i]===')'){
                closedParentheses++;
            }
            else if(inputCopy[i]==='('){
                closedParentheses--;
            }
            else if((inputCopy[i]==='+'||inputCopy[i]==='-'||inputCopy[i]==='*'||inputCopy[i]==='/')&&closedParentheses===0){
                lastOp=i;
                break
            }
        }
        if(lastOp===inputCopy.length-1){
            return inputCopy;
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


    const getLastOperant=()=>{
        let inputCopy=String(input);
        let first=0;
        for(let i=inputCopy.length;i>=0;i--){
            if(inputCopy[i]==='+'||inputCopy[i]==='-'||inputCopy[i]==='*'||inputCopy[i]==='/'||inputCopy==='^'){
                first=i+1;
                break
            }
        }
        return(inputCopy.slice(0,first)+'('+inputCopy.slice(first));
    }

    const del=()=>{
        let inputCopy=String(input);
        let closedParentheses=1;
        let end;
        if(inputCopy[inputCopy.length-1]===')'){
            for(let i=inputCopy.length-2;i>=0;i--){
                if(inputCopy[i]===')'){
                    closedParentheses++;
                }
                else if(inputCopy[i]==='('){
                    closedParentheses--;
                }
                if(closedParentheses===0){
                    end=i;
                    break;
                }
            }
            return(String(input).slice(0, end))
        }
        else{
            return(String(input).slice(0, -1))
        }
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
            if(data==='√'){
                setInput(getLastOperant()+'^(1/2))')
            }
            else if(data==='x²'){
                setInput(getLastOperant()+'^2)')
            }
            else{
                setInput(getLastOperant()+'^(-1))')
            }
        }
        else if(data==='C'||data==='CE'){
            setInput('');
            setOutput('');
        }
        else if(data==='←'){
            setInput(del());
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
