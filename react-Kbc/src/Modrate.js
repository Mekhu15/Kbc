import React, { Component } from "react";
import Difficult from "./Diff";
import data from "./questions.json";
import Header from "./Header";
import cash from "./cashprize.json";
import Result from "./Result";
export default class Modrate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 0,
      prize: [20000, 40000, 80000, 160000, 320000],
      arr: ["Sixth", "Seventh", "Eigth", "Nineth", "Tenth"],
      score1: 0,
      username: props.username,
      answer: "",
      cashPrize: cash,
      state1: props.state1,
      state2: props.state2,
      disable: true,
      active: false,
      option: false,
      temp: 7,
    };
  }

  componentDidMount() {
    this.getQuestion();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentQuestion !== prevState.currentQuestion) {
      this.setState(() => {
        return {
          disable: true,
          active: false,
          questions: data.moderate[this.state.currentQuestion].question,
        };
      });
    }
  }

  getQuestion = () => {
    this.setState(() => {
      return {
        questions: data.moderate[this.state.currentQuestion].question,
      };
    });
  };

  nextQuestionHandler = () => {
    if (this.state.currentQuestion === 7) {
      this.setState({
        currentQuestion: this.state.temp + 1,
      });
    }
    this.setState({
      currentQuestion: this.state.currentQuestion + 1,
      state: this.state.state + 1,
    });
  };

  //to check answer
  getValue = (event, sum) => {
    if (event == data.moderate[this.state.currentQuestion].answer) {
      const prize = this.state.prize;
      if (this.state.currentQuestion === 7) {
        sum = prize[this.state.temp];
      } else {
        sum = prize[this.state.currentQuestion];
      }
    } else {
      sum = sum + 0;
    }
    this.state.score1 = sum;
    this.state.answer = event;
    this.setState({
      disable: false,
      active: true,
    });
    if (this.state.answer === data.moderate[this.state.currentQuestion].answer)
      alert(`Your answer is right and you won Rs.${sum}`);
    else {
      this.setState({
        option: true,
      });
    }
  };

  fifty = () => {
    this.setState({
      state1: true,
    });
    alert("You have used your 50-50 lifeline");
  };

  switch = () => {
    this.setState({
      state2: true,
      temp: this.state.currentQuestion,
      currentQuestion: 7,
    });
    alert("You have used your switch lifeline");
  };

  render() {
    return (
      <div>
        {this.state.option === true ? (
          <div>
            You Loose on this Question
            <Result score1={this.state.score1} username={this.state.username} />
          </div>
        ) : this.state.currentQuestion < 5 ||
          this.state.currentQuestion === 7 ? (
          <div>
            <Header username={this.props.username} />
            <br />
            <br />
            {this.state.currentQuestion < data.moderate.length && (
              <>
                <h3>{this.state.questions}</h3>
                <div className="options" key={this.state.currentQuestion}>
                  <div className="optionsContainer">
                    <div>
                      <button
                        value={
                          data.moderate[this.state.currentQuestion].options[0]
                            .option
                        }
                        onClick={(e) =>
                          this.getValue(e.target.value, this.state.score1)
                        }
                        disabled={this.state.active}
                      >
                        {" "}
                        A.
                        {
                          data.moderate[this.state.currentQuestion].options[0]
                            .option
                        }{" "}
                      </button>
                      <button
                        value={
                          data.moderate[this.state.currentQuestion].options[1]
                            .option
                        }
                        onClick={(e) =>
                          this.getValue(e.target.value, this.state.score1)
                        }
                        disabled={this.state.active}
                      >
                        B.{" "}
                        {
                          data.moderate[this.state.currentQuestion].options[1]
                            .option
                        }
                      </button>
                    </div>
                    <div>
                      {" "}
                      <button
                        value={
                          data.moderate[this.state.currentQuestion].options[2]
                            .option
                        }
                        onClick={(e) =>
                          this.getValue(e.target.value, this.state.score1)
                        }
                        disabled={this.state.active}
                      >
                        {" "}
                        C.
                        {
                          data.moderate[this.state.currentQuestion].options[2]
                            .option
                        }
                      </button>
                      <button
                        value={
                          data.moderate[this.state.currentQuestion].options[3]
                            .option
                        }
                        onClick={(e) =>
                          this.getValue(e.target.value, this.state.score1)
                        }
                        disabled={this.state.active}
                      >
                        {" "}
                        D.{" "}
                        {
                          data.moderate[this.state.currentQuestion].options[3]
                            .option
                        }
                      </button>
                    </div>
                  </div>
                  <div className="highlight">
                    <marquee behaviour="scroll" direction="left">
                      {" "}
                      Welcome to KBC Reloaded!! Here we bring the{" "}
                      {this.state.arr[this.state.currentQuestion]} question for
                      Rs.
                      {this.state.prize[this.state.currentQuestion]}
                    </marquee>
                  </div>
                  <div className="lifeline">
                    <button onClick={this.fifty} disabled={this.state.state1}>
                      50-50
                    </button>
                    <button onClick={this.switch} disabled={this.state.state2}>
                      Switch this Question
                    </button>
                  </div>
                </div>
                <hr />
                <button
                  className="next"
                  onClick={this.nextQuestionHandler}
                  disabled={this.state.disable}
                >
                  Next
                </button>
              </>
            )}
            <div className="flex-container">
              {this.state.cashPrize.map((award) => (
                <div style={{ backgroundColor: this.state.color }}>
                  {award.title}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Difficult
            username={this.state.username}
            state1={this.state.state1}
            state2={this.state.state2}
          />
        )}
      </div>
    );
  }
}
