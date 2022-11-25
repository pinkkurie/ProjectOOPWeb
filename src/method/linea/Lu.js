import React, { Component } from 'react'
import 'antd/dist/antd.min.css';
import "../../component.css"
import { Card, Input, Button } from 'antd';
import { lusolve, format } from 'mathjs';
const InputStyle = {
	background: "#5F9EA0",
	color: "white",
	fontWeight: "bold",
	fontSize: "24px"
}
var A = [], B = [],  matrixA = [], matrixB = [], output = [],answer
class Lu extends Component{
    constructor(){
        super();
        this.state = {
            row: 0,
            column: 0,
            showDimentionForm: true,
            showMatrixForm: false,
            showOutputCard: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.Lu = this.Lu.bind(this);

}
Lu(){
    this.matrixCreate()
    answer = lusolve(A,B)
    for (var i = 0; i < answer.length; i++) {
        output.push(Math.round(answer[i]));
        output.push(<br />)
    }
    this.setState({
        showOutputCard: true
    });

}
printFraction(value) {
    console.log( format(value, { fraction: 'ratio' }))
    return format(value, { fraction: 'ratio' })

}
createMatrix(row, column) {

    for (var i = 1; i <= row; i++) {
        for (var j = 1; j <= column; j++) {
            matrixA.push(<Input style={{
                width: "14%",
                height: "50%",
                backgroundColor:  "#DAA520",
                marginInlineEnd: "5%",
                marginBlockEnd: "5%",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
            }}
                id={"a" + i + "" + j} key={"a" + i + "" + j} placeholder={"a" + i + "" + j} />)
        }
       matrixA.push(<br />)
        matrixB.push(<Input style={{
            width: "14%",
            height: "50%",
            backgroundColor: "#DAA520",
            marginInlineEnd: "5%",
            marginBlockEnd: "5%",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold"
        }}
            id={"b" + i} key={"b" + i} placeholder={"b" + i} />)
    }
    this.setState({
        showDimentionForm: false,
        showMatrixForm: true,
    })


}
matrixCreate() {
    for (var i = 0; i < this.state.row; i++) {
        A[i] = []
        for (var j = 0; j < this.state.column; j++) {
            A[i][j] = (parseFloat(document.getElementById("a" + (i + 1) + "" + (j + 1)).value));
            console.log(A[i][j])
        }
        B.push(parseFloat(document.getElementById("b" + (i + 1)).value));
    }
}
handleChange(event) {
    this.setState({
        [event.target.name]: event.target.value
    });
}
render(){
    return(
        <div style={{ background: "#FFFF", padding: "30px" }}>
        <h2 style={{ color: "black", fontWeight: "bold" }}>LU Decomposition</h2>
        <div className="row">
            <div className="col">
                <Card
                    bordered={true}
                    style={{ background: "DarkSlateGray", borderRadius:"15px", color: "#FFFFFFFF" }}
                    onChange={this.handleChange}
                >


                    {this.state.showDimentionForm &&
                        <div>
                            <h2 style={{color:"white"}}>Row</h2><Input size="large" name="row" style={InputStyle}></Input>
                            <h2 style={{color:"white"}}>Column</h2><Input size="large" name="column" style={InputStyle}></Input>
                            <Button id="dimention_button" onClick={
                                () => this.createMatrix(this.state.row, this.state.column)
                            }
                                style={{ background: "#4caf50", color: "white" }}>
                                Submit
                        </Button>
                        </div>
                    }

                    {this.state.showMatrixForm &&
                        <div>
                            <h2 style={{color:"white"}}>Matrix [A]</h2><br />{matrixA}
                            <h2 style={{color:"white"}}>Vector [B]<br /></h2>{matrixB}
                            
                        <Button
                                id="matrix_button"
                                style={{ background: "blue", color: "white"}}
                                onClick={() => this.Lu()}>
                                Submit
                        </Button>
                        </div>
                    }
                </Card>
            </div>
            <div className="col">
                {this.state.showOutputCard &&
                    <Card
                        title={"Output"}
                        bordered={true}
                        style={{ background: "#3d683d", color: "#FFFFFFFF" }}
                        onChange={this.handleChange} id="answerCard">
                        <p style={{ fontSize: "24px", fontWeight: "bold" }}>{output}</p>
                    </Card>
                }
            </div>
        </div>
    </div>
)
}
}
export default Lu