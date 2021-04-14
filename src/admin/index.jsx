import { Button, Container, Paper } from "@material-ui/core";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { serverUrl } from "../config";
import "./index.css";

const DownloadCsv = () => {
  const history = useHistory();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      history.push('/admin/login');
    }
  },[token, history]);


  const handleDownload = async () => {
    await fetch(`${serverUrl}/admin/getCsv`, {
      headers: {
        'x-auth-token': token
      }
    }).then(resp => resp.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'enquiries.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      alert('your file has downloaded!');
    })
    .catch(() => alert('oh no!'));
  }
  return (
    <div className="csv-page">
      <Container>
        <div className="csv-btn">
          <Paper variant="elevation" elevation={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDownload}
            >
              Download CSV
            </Button>
          </Paper>
        </div>
      </Container>
    </div>
  );
};
export default DownloadCsv;
