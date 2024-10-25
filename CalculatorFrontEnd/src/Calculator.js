import React, {useState} from 'react';
import './CalculatorStyle.css';
import Button from './Button'

function Calculator(){

    const buttons=[["%","special"],["C","special"],["CE","special"],["←","special"],
    ["1/x","special"],["x²","special"],["√","special"],["/","special"],
    ["7",""],["8",""],["9",""],["*","special"],
    ["4",""],["5",""],["6",""],["-","special"],
    ["1",""],["2",""],["3",""],["+","special"],
    ["+/-",""],["0",""],[".",""],["=","special2"]];

    const [input,setInput]=useState("");
    const [output,setOutput]=useState("");
    const [lstUsed,setlstUsed]=useState("lstUsed");

    const inStyle={
        height:output===""?"100px":"50px",fontSize:output===""?"30px":"26px"
    }

    const outStyle={
        display: output===""?"none":"flex"
    }

    return(
        <div className="calculator-body">
            <div className='screens'>
                <div style={inStyle} className='input '>{input}</div>
                <div style={outStyle} className='output'>{output}</div>
            </div>
            <div className='buttons-container'>
                {
                    buttons.map((button,index)=>(
                        <Button key={index} data={button[0]} className={button[1]} input={input} setInput={setInput} output={output} setOutput={setOutput} lstUsed={lstUsed} setlstUsed={setlstUsed}/>
                    ))
                }
            </div>
        </div>
    );
}
export default Calculator;