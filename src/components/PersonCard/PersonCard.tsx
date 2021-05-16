import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {
  Link
} from "react-router-dom";
import useStyles  from './styles';



const PersonCard = ({ person }) => {
  const { name, homeworld } = person;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {name}
        </Typography>
        <Typography variant="h5" component="h2">
          {homeworld.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to="/person">
          <Button size="small">Learn More</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default PersonCard;
