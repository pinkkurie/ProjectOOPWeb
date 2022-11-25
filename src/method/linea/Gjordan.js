import React, { Component } from 'react'
import 'antd/dist/antd.min.css';
import "../../component.css"
import { Card, Input, Button } from 'antd';
const InputStyle = {
	background: "#5F9EA0",
	color: "white",
	fontWeight: "bold",
	fontSize: "24px"
}
var A = [], B = [], X, matrixA = [], matrixB = [], output = []
class Gjordan extends Component{

    constructor(){
        super()
        this.state={
            row: 0,
            column: 0,
            showDimentionForm: true,
            showMatrixForm: false,
            showOutputCard: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.gjordann = this.gjordann.bind(this)
    }
    gjordann(n){
        this.matrixCreate()
        for (var k = 0; k < n; k++) {
            for (var i = k + 1; i < n; i++) {
                var factor = A[i][k] / A[k][k];
                for (var j = k; j < n; j++) {
                    A[i][j] = A[i][j] - factor * A[k][j];
                }
                B[i] = B[i] - factor * B[k];

            }
        }
        //Backward Substitution
        for (k = n - 1; k >= 0; k--) {
            for (i = k; i >= 0; i--) {

                if (i === k) {//Identity matrix
                    factor = 1 / A[i][k];

                    for (j = 0; j < n; j++) {
                        A[i][j] = A[i][j] * factor;
                    }
                    B[i] = B[i] * factor;


                }
                else {
                    factor = A[i][k] / A[k][k];
                    for (j = 0; j < n; j++) {
                        A[i][j] = A[i][j] - factor * A[k][j];
                    }
                    B[i] = B[i] - factor * B[k];
                }
            }
        }
        for (i = 0; i < n; i++) {
            output.push("X"+(i+1)+"="+B[i]);
            output.push(<br />)
        }
        this.setState({
            showOutputCard: true
        });
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
        let { row, column } = this.state;
        return(
           <div style={{background: "#FFFF", padding: "30px" }} >
                 <h2 style={{ color: "black", fontWeight: "bold" }}>Gauss Jordan Elimination</h2>
                 <div  className="row">
                    <div className="col">
                        <Card bordered={true}
                            style={{ background: "DarkSlateGray", borderRadius:"15px", color: "#FFFFFFFF" }}
                            onChange={this.handleChange}
                        >
                            
                            {this.state.showDimentionForm &&
                                <div>
                                    <h2 style={{color : "white"}}>Row</h2><Input size="large" name="row" style={InputStyle}></Input>
                                    <h2 style={{color : "white"}}>Column</h2><Input size="large" name="column" style={InputStyle}></Input>
                                    <Button id="dimention_button" onClick={
                                        () => this.createMatrix(this.state.row, this.state.column)
                                    }
                                        style={{ background: "#4caf50", color: "white" }}>
                                        Submit<br></br>
                                    </Button>
                                </div>
                            }

                            {this.state.showMatrixForm &&
                                <div>
                                    <h2 style={{color : "white"}} >Matrix [A]</h2><br />{matrixA}
                                    <h2 style={{color : "white"}}>Vector [B]<br /></h2>{matrixB}
                                    <br/>
                                    <Button
                                        id="matrix_button"
                                        style={{ background: "blue", color: "white" }}
                                        onClick={() => this.gjordann(this.state.row)}>
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
                                style={{ width: 400, background: "#3d683d", color: "#FFFFFFFF", float: "left" }}
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
export default Gjordan