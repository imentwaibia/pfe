import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Row, Col, Container, Image, Button } from "react-bootstrap";
import { styled } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell, { tableCellClasses } from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ErrorModel from "../../../models/error-model";
import SuccessModel from "../../../models/success-model";
import Navb from "../Navb"
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const Confirmeinscription = (props) => {
  const [list, setList] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/jardin/`);

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setList(responseData.existingJardin);
      } catch (err) {
        seterror(err.message);
      }
    };

    sendRequest();
  }, []);

  console.log(list);

  return (
    <div style={{  backgroundColor: "#FDEDEC"}}>
      <header style={{  backgroundColor: "#AED6F1",padding:"50px", fontsize: "25px"}}>
      <Navb/>
      </header>
      <center>
      <Container style={{  margin: "2%" }}>
        <Row>
          <Col></Col>
          <Col xs={12}>
            <ErrorModel error={error} />
            <SuccessModel success={success} />
            <TableContainer component={Paper}>
              <Table style={{ backgroundColor: "#F4ECF7" }}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell style={{  backgroundColor: "#ABB2B9"}}>Image</StyledTableCell>
                    <StyledTableCell align="right" style={{  backgroundColor: "#ABB2B9"}}>Nom</StyledTableCell>
                    <StyledTableCell align="right" style={{  backgroundColor: "#ABB2B9"}}>Email</StyledTableCell>
                    <StyledTableCell align="right" style={{  backgroundColor: "#ABB2B9"}}>Adresse</StyledTableCell>
                    <StyledTableCell align="right" style={{  backgroundColor: "#ABB2B9"}}>Tel</StyledTableCell>
                    <StyledTableCell align="right" style={{  backgroundColor: "#ABB2B9"}}>Description</StyledTableCell>
                    <StyledTableCell align="right" style={{  backgroundColor: "#ABB2B9"}}>
                      Confirmation
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list &&
                    list.filter((el) => el.confirmation === "false").map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">
                          <Image
                            src={`http://localhost:5000/${row.logo}`}
                            roundedCircle
                          />
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.nom}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.email}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.adresse}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.tel}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.description}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <Button
                            variant="success"
                            onClick={async (event) => {
                              try {
                                let response = await fetch(
                                  `http://localhost:5000/api/jardin/confirm/${row._id}`,
                                  {
                                    method: "PATCH",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                      email: row.email,
                                    }),
                                  }
                                );
                                let responsedata = await response.json();
                                if (!response.ok) {
                                  seterror(responsedata.message);
                                  throw new Error(responsedata.message);
                                }
                                setsuccess("Compte confirmer.");
                                seterror(null);
                              } catch (err) {
                                console.log(err);
                                seterror(err.message || "probleme!!");
                              }
                            }}
                          >
                            Confirmer inscription
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Col>
          <Col></Col>
        </Row>
      </Container>
      </center>
    </div>
  );
};
export default Confirmeinscription;