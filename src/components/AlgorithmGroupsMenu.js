import {Divider, Icon, Image, List, Popup, Table} from "semantic-ui-react"
import React from "react"
import {connect} from "react-redux"
import {selectGroup} from "../ducks/algorithms"
import {selectMenuItem} from "../ducks/menu";
import {NavLink} from "react-router-dom";
import constants from "../constants";
import {setDisconnected} from "../ducks/connection";


const navStyle = {
    padding: "11px"
}

const url = new URL(window.location.href)
export const publicPathTo = (append) => {
    if (url.protocol.includes('http')) return `/${append}`
    return `${url.protocol}//${url.pathname.split('/dist/')[0]}/dist/${append}`
}

const AlgorithmsGroupMenu = ({metadata, setDatasetsActive, credentials, setDisconnected}) =>
    <header
        style={{display: "flex", justifyContent: "space-between", background: "#000", color: "#fff", height: "37px"}}>
        <div style={{display: "flex"}}>
            <Image src={publicPathTo("images/noun_Sandbox Toys_1207953.png")} style={{height: "37px"}}/>
            <span style={{padding: "10px 0 10px 0"}}>NEuler</span>
        </div>
        <div style={navStyle}>
            <nav>
                <NavLink exact={true} activeClassName="selected" to="/">Home</NavLink>
                <NavLink activeClassName="selected" to="/algorithms">Run Single Algorithm</NavLink>
                <NavLink activeClassName="selected" to="/recipes">Run Algorithm Recipe</NavLink>
            </nav>
        </div>
        <div style={navStyle}>
            <nav>

                <Popup open trigger={<Icon name="setting" size="large"/>} flowing hoverable className="about-menu">
                    <List>
                        <List.Item className="connection-list-item">
                            <List className="connection">
                                <List.Item className="connection-item">
                                    <label>Username</label>
                                    <span>{credentials.username}</span>
                                </List.Item>
                                <List.Item className="connection-item">
                                    <label>Server</label>
                                    <span>{credentials.host}</span>
                                </List.Item>
                                <List.Item className="connection-item">
                                    <label>Database</label>
                                    <span>{metadata.activeDatabase}</span>
                                </List.Item>
                            </List>
                            <div className="configure-database">
                                <NavLink to="/database">Configure Database</NavLink>
                            </div>

                        </List.Item>


                        <Divider/>
                        <List.Item>
                            <Table basic='very' celled collapsing className="versions">
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>
                                            Component
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Version
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>NEuler</Table.Cell>
                                        <Table.Cell>
                                            {constants.version}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>Graph Data Science Library</Table.Cell>
                                        <Table.Cell>{metadata.versions.gdsVersion}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>Neo4j Server</Table.Cell>
                                        <Table.Cell>{metadata.versions.neo4jVersion}
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </List.Item>

                        <Divider/>

                        <List.Item as='a' onClick={() => setDatasetsActive(true)} className="about-menu">
                            <Image size="mini" src={publicPathTo("images/noun_Import Database_281767.png")}/>
                            <List.Content>
                                <List.Header as="a">Sample Graphs</List.Header>
                            </List.Content>
                        </List.Item>

                        <List.Item as='a' onClick={() => setDisconnected()} className="about-menu">
                            <Image size="mini" src={publicPathTo("images/noun_sign out_1157133.png")}/>
                            <List.Content>
                                <List.Header as="a">Sign Out</List.Header>
                            </List.Content>
                        </List.Item>

                    </List>
                </Popup>

            </nav>
        </div>
    </header>

const mapStateToProps = state => ({
    activeAlgorithm: state.algorithms.algorithm,
    activeMenuItem: state.menu.item,
})

const mapDispatchToProps = dispatch => ({
    selectGroup: group => dispatch(selectGroup(group)),
    selectMenuItem: item => dispatch(selectMenuItem(item)),
    setDisconnected: () => dispatch(setDisconnected()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AlgorithmsGroupMenu)
