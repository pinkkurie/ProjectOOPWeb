import React, { Component } from 'react'
import 'antd/dist/antd.min.css';
import { Card, Input, Button, Table } from 'antd';
import { error, func} from '../../Useful/Chage';
import Graph from '../../Useful/Graph';
import "../../component.css"

const InputStyle = {
	background: "#5F9EA0",
	color: "white",
	fontWeight: "bold",
	fontSize: "24px"

};
var dataInTable = []
const columns = [
    {
        title: "Iteration",
        dataIndex: "iteration",
        key: "iteration"
    },
    {
        title: "Y",
        dataIndex: "y",
        key: "y"
    },
    {
        title: "Error",
        key: "error",
        dataIndex: "error"
    },
    {
        title: "F(x)",
        key: "fxanser",
        dataIndex: "fxanser"
    }
];
class Secant extends Component{
    constructor(){
        super();
        this.state={
            fx: "",
            x0: 0,
            x1: 0,
            errorinput : 0.0000001,
            showOutputCard: false,
            showGraph: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.secant = this.secant.bind(this);
    }
    secant(x0,x1,errorinput){
        var x = [], 
        y = 0,
        epsilon = parseFloat(0.000000);
        var n = 1
        var i = 1
        var data=[]
        data['y'] = []
        data['error'] = []
        data['fxanser']=[]
        x.push(x0);
        x.push(x1);
        data['y'][0] = x0;
        data['error'][0] = "---";
        data['fxanser'][0]= "---";
        do {
            y = x[i] - (func(this.state.fx, x[i]) * ((x[i] - x[i - 1]))) / (func(this.state.fx, x[i]) - func(this.state.fx, x[i - 1]));
            x.push(y);
            epsilon = error(y, x[i]);
            data['y'][n] = y.toFixed(8);
            data['error'][n] = Math.abs(epsilon).toFixed(8);
            data['fxanser'][n] =func(this.state.fx ,y)

            n++;
            i++;
        } while (Math.abs(epsilon) >errorinput);
        this.createTable(data['y'], data['error'],data['fxanser']);
        this.setState({
            showOutputCard: true,
            showGraph: true
        })
        
    }
    createTable(y, error,fxanser) {
        dataInTable = []
        for (var i = 0; i < y.length; i++) {
            dataInTable.push({
                iteration: i + 1,
                y: y[i],
                error: error[i],
                fxanser : fxanser[i]
            });
        }
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render(){
        let { fx, x0, x1 ,errorinput} = this.state;
        return(
            <div style={{ background: "#FFFF", padding: "30px" }}>
            <h2 style={{ color: "black", fontWeight: "bold" }}>Secant Method</h2>
            <div className="row">
                <div className="col">
                    <Card
                        bordered={true}
                        style={{ background: "DarkSlateGray", borderRadius:"15px", color: "#FFFFFFFF" }}
                        onChange={this.handleChange}
                    >
                        <h2 style={{color:"white"}}>f(x)</h2><Input size="large" name="fx" style={InputStyle}></Input>
                        <h2 style={{color:"white"}}>X<sub>0</sub></h2><Input size="large" name="x0" style={InputStyle}></Input>
                        <h2 style={{color:"white"}}>X<sub>1</sub></h2><Input size="large" name="x1" style={InputStyle}></Input>
                        <h2 style={{color:"white"}}>Error</h2><Input size="large" name="errorinput" style={InputStyle}></Input> <br /><br />
                        <Button id="submit_button" onClick={
                            () => this.secant(parseFloat(x0), parseFloat(x1),parseFloat(errorinput))
                        }
                            style={{ background: "#4caf50", color: "white" }}>Submit</Button>

                    </Card>
                </div>
                <div className="col">
                    {this.state.showGraph && <Graph fx={fx} title="Secant Method" />}
                </div>
            </div>
            <div className="row">
                {this.state.showOutputCard &&
                    <Card
                        title={"Output"}
                        bordered={true}
                        style={{ width: "100%", background: "#2196f3", color: "#FFFFFFFF" }}
                        id="outputCard"
                    >
                        <Table columns={columns} dataSource={dataInTable} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "black" }}
                        ></Table>
                    </Card>
                }
            </div>

        </div>
        )
    }
}
export default Secant