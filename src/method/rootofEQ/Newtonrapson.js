import React, { Component } from 'react'
import 'antd/dist/antd.min.css';
import { Card, Input, Button, Table } from 'antd';
import { error, func,funcDiff} from '../../Useful/Chage';
import Graph from '../../Useful/Graph';
import "../../component.css"

const InputStyle = {
	background: "#5F9EA0",
	color: "white",
	fontWeight: "bold",
	fontSize: "24px"

};
var dataInTable;
const columns = [
    {
        title: "Iteration",
        dataIndex: "iteration",
        key: "iteration"
    },
    {
        title: "X",
        dataIndex: "x",
        key: "x"
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
class Newton extends Component{
    constructor(){
        super();
        this.state={
            fx: "",
            x0: 0,
            inputerror: 0,
            showOutputCard: false,
            showGraph: false
        }
        this.handleChange =this.handleChange.bind(this);
        this.newtonrapson = this.newtonrapson.bind(this);
    }

    newtonrapson(xold,inputerror){
        var xnew = 0
        var epsilon = parseFloat(0.000000);
        var n = 0;
        var data = []
        data['x'] = []
        data['error'] = []
        data['fxanser']=[]
        do{
            xnew =xold-(func(this.state.fx , xold)/ funcDiff(xold))
            epsilon = error(xnew,xold)
            data['x'][n]=xnew.toFixed(8)
            data['erroe'][n] =Math.abs(epsilon).toFixed(8)
            data['fxanser'][n] =func(this.state.fx , xnew)
            n++
            xold = xnew
        }while (Math.abs(epsilon)>inputerror)
        this.createtable(data['x'],data['error'],data['fxanser'])
        this.setState({
            showOutputCard: true,
            showGraph : true 
        })
        
    }
    createtable(x ,error,fxanser){
        dataInTable =[]
        for (let i = 0; i < x.length; i++) {
           dataInTable.push({
            iteration: i + 1,
            x: x[i],
            error: error[i],
            fxanser : fxanser[i]
           })
            
        }

    }
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render(){
        let {fx,x0,inputerror} =this.state
        return(
            <div style={{ background: "#FFFF", padding: "30px" }}>
            <h2 style={{ color: "black", fontWeight: "bold" }}>Newton Raphson</h2>
            <div className="row">
                <div className="col">
                    <Card
                        bordered={true}
                        style={{ background: "DarkSlateGray", borderRadius:"15px", color: "#FFFFFFFF" }}
                        onChange={this.handleChange}
                    >
                        <h2 style={{color:"white"}}>f(x)</h2><Input size="large" name="fx" style={InputStyle}></Input>
                        <h2 style={{color:"white"}}>X<sub>0</sub></h2><Input size="large" name="x0" style={InputStyle}></Input>
                        <h2 style={{color:"white"}}>Error</h2><Input size="large" name="inputerror" style={InputStyle}></Input>
                        <Button id="submit_button" onClick={
                            () => this.newtonrapson(parseFloat(x0),parseFloat(inputerror))
                        }
                            style={{ background: "#4caf50", color: "white" }}>Submit</Button>

                    </Card>
                </div>
                <div className="col">
                    {this.state.showGraph && <Graph fx={fx} title="Newton-Raphson" />}
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
                        <Table columns={columns} bordered={true} dataSource={dataInTable} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "black" }}
                        ></Table>
                    </Card>
                }
            </div>
        </div>
        )
    }
}
export default Newton