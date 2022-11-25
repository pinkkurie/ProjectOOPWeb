import React, { Component } from 'react'
import 'antd/dist/antd.min.css';
import "../../component.css"
import { Card, Input, Button, Table } from 'antd';
import { error, func} from '../../Useful/Chage';
import Graph from '../../Useful/Graph';

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
        title: "XL",
        dataIndex: "xl",
        key: "xl"
    },
    {
        title: "XR",
        dataIndex: "xr",
        key: "xr"
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
    } ,
    {
        title: "F(x)",
        key: "fxanser",
        dataIndex: "fxanser"
    }
];

class Falsepositions extends Component {

    constructor() {
        super();
        this.state = {
            fx: "",
            xl: 0,
            xr: 0,
            inputerror: 0,
            showOutputCard: false,
            showGraph: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.false_position = this.false_position.bind(this);
    }

    false_position(xl, xr,inputerror) {
        var increaseFunction = false;
        var xi = 0;
        var epsilon = parseFloat(0.000000);
        var n = 0;
        var data = []
        data['xl'] = []
        data['xr'] = []
        data['x'] = []
        data['error'] = []
        data['fxanser']=[]
        if (func(this.state.fx, xl) < func(this.state.fx, xr)) {
            increaseFunction = true;
        }
        do {
            xi = (xl * func(this.state.fx, xr) - xr * func(this.state.fx, xl)) / (func(this.state.fx, xr) - func(this.state.fx, xl));
            if (func(this.state.fx, xi) * func(this.state.fx, xr) < 0) {
                epsilon = error(xi, xr);
                if (increaseFunction) {
                    xl = xi;
                }
                else {
                    xr = xi;
                }

            }
            else {
                epsilon = error(xi, xl);
                if (increaseFunction) {
                    xr = xi;
                }
                else {
                    xl = xi;
                }

            }
            data['xl'][n] = xl;
            data['xr'][n] = xr;
            data['x'][n] = xi.toFixed(8);
            data['error'][n] = Math.abs(epsilon).toFixed(8);
            data['fxanser'][n] = func(this.state.fx , xi)
            console.log()
            n++;
        } while (Math.abs(epsilon) > inputerror);

        this.createTable(data['xl'], data['xr'], data['x'], data['error'],data['fxanser']);
        this.setState({
            showOutputCard: true,
            showGraph: true
        })


    }

    createTable(xl, xr, x, error,fxanser) {
        dataInTable = []
        for (var i = 0; i < xl.length; i++) {
            dataInTable.push({
                iteration: i + 1,
                xl: xl[i],
                xr: xr[i],
                x: x[i],
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
    render() {
        let { fx, xl, xr ,inputerror } = this.state;
        return (
            <div style={{ background: "#FFFF", padding: "30px" }}>
                <h2 style={{ color: "black", fontWeight: "bold" }}>False Position</h2>
                <div className="row">
                    <div className="col">
                        <Card
                           style={{ background: "DarkSlateGray",borderRadius:"10px", color: "#FFFFFFFF" }}
                           onChange={this.handleChange}
                        >
                            <h2 style={{color:"white"}}>f(x)</h2><Input size="large" name="fx" style={InputStyle}></Input>
                            <h2 style={{color:"white"}}> X<sub>L</sub></h2><Input size="large" name="xl" style={InputStyle}></Input>
                            <h2 style={{color:"white"}}>X<sub>R</sub></h2><Input size="large" name="xr" style={InputStyle}></Input><br /><br />
                            <h2 style={{color:"white"}}>Error</h2><Input size="large" name="inputerror" style={InputStyle}></Input>
                            <Button id="submit_button" onClick={
                                () => this.false_position(parseFloat(xl), parseFloat(xr),parseFloat(inputerror))
                            }
                                style={{ background: "#4caf50", color: "white" }}>Submit</Button>

                        </Card>
                    </div>
                    <div className="col">
                        {this.state.showGraph && <Graph fx={fx} title="False Position" />}
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
        );
    }
}
export default Falsepositions;