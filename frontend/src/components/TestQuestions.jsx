export class TestQuestions{
    
   DepressionTest(){
      const depression =[
        {
          "title": "Over the last 2 weeks, how often have you been bothered by any of the following problems?",
          "question": "Little interest or pleasure in doing things?",
          "options": [
            {"response": "Not at all", "score": 0},
            {"response": "Several days", "score": 1},
            {"response": "More than half the days", "score": 2},
            {"response": "Nearly every day", "score": 3}
          ]
        },
        {
          "question": "Feeling down, depressed, or hopeless?",
          "options": [
            {"response": "Not at all", "score": 0},
            {"response": "Several days", "score": 1},
            {"response": "More than half the days", "score": 2},
            {"response": "Nearly every day", "score": 3}
          ]
        },
        {
          "question": "Trouble falling or staying asleep, or sleeping too much?",
          "options": [
            {"response": "Not at all", "score": 0},
            {"response": "Several days", "score": 1},
            {"response": "More than half the days", "score": 2},
            {"response": "Nearly every day", "score": 3}
          ]
        },
        {
          "question": "Feeling tired or having little energy?",
          "options": [
            {"response": "Not at all", "score": 0},
            {"response": "Several days", "score": 1},
            {"response": "More than half the days", "score": 2},
            {"response": "Nearly every day", "score": 3}
          ]
        },
        {
          "question": "Poor appetite or overeating?",
          "options": [
            {"response": "Not at all", "score": 0},
            {"response": "Several days", "score": 1},
            {"response": "More than half the days", "score": 2},
            {"response": "Nearly every day", "score": 3}
          ]
        },
        {
          "question": "Feeling bad about yourself — or that you are a failure or have let yourself or your family down?",
          "options": [
            {"response": "Not at all", "score": 0},
            {"response": "Several days", "score": 1},
            {"response": "More than half the days", "score": 2},
            {"response": "Nearly every day", "score": 3}
          ]
        },
        {
          "question": "Trouble concentrating on things, such as reading the newspaper or watching television?",
          "options": [
            {"response": "Not at all", "score": 0},
            {"response": "Several days", "score": 1},
            {"response": "More than half the days", "score": 2},
            {"response": "Nearly every day", "score": 3}
          ]
        },
        {
          "question": "Moving or speaking so slowly that other people could have noticed? Or so fidgety or restless that you have been moving a lot more than usual?",
          "options": [
            {"response": "Not at all", "score": 0},
            {"response": "Several days", "score": 1},
            {"response": "More than half the days", "score": 2},
            {"response": "Nearly every day", "score": 3}
          ]
        },
        {
          "question": "Thoughts that you would be better off dead, or thoughts of hurting yourself in some way?",
          "options": [
            {"response": "Not at all", "score": 0},
            {"response": "Several days", "score": 1},
            {"response": "More than half the days", "score": 2},
            {"response": "Nearly every day", "score": 3}
          ]
        }
      ]
        return depression;      
   }
   AnxietyTest(){
    const anxiety =[
        {
          "title": "Over the last 2 weeks, how often have you been bothered by any of the following problems?",
          "question": "Feeling nervous, anxious, or on edge",
          "options": [
            {"response": "Not at all", "score": 0},
            {"response": "Several days", "score": 1},
            {"response": "More than half the days", "score": 2},
            {"response": "Nearly every day", "score": 3}
          ]
        },
        {
          "question": "Not being able to stop or control worrying",
          "options": [
            {"response": "Not at all", "score": 0},
            {"response": "Several days", "score": 1},
            {"response": "More than half the days", "score": 2},
            {"response": "Nearly every day", "score": 3}
          ]
        },
        {
          "question": "Worrying too much about different things",
          "options": [
            {"response": "Not at all", "score": 0},
            {"response": "Several days", "score": 1},
            {"response": "More than half the days", "score": 2},
            {"response": "Nearly every day", "score": 3}
          ]
        },
        {
          "question": "Trouble relaxing",
          "options": [
            {"response": "Not at all", "score": 0},
            {"response": "Several days", "score": 1},
            {"response": "More than half the days", "score": 2},
            {"response": "Nearly every day", "score": 3}
          ]
        },
        {
          "question": "Being so restless that it is hard to sit still",
          "options": [
            {"response": "Not at all", "score": 0},
            {"response": "Several days", "score": 1},
            {"response": "More than half the days", "score": 2},
            {"response": "Nearly every day", "score": 3}
          ]
        },
        {
          "question": "Becoming easily annoyed or irritable",
          "options": [
            {"response": "Not at all", "score": 0},
            {"response": "Several days", "score": 1},
            {"response": "More than half the days", "score": 2},
            {"response": "Nearly every day", "score": 3}
          ]
        },
        {
          "question": "Feeling afraid, as if something awful might happen",
          "options": [
            {"response": "Not at all", "score": 0},
            {"response": "Several days", "score": 1},
            {"response": "More than half the days", "score": 2},
            {"response": "Nearly every day", "score": 3}
          ]
        }
      ]
        return anxiety;      
   }
   BipolarTest(){
     const bipolar =[
        {
          "title":"Has there ever been a period of time when you were not your usual self and...",
          "question": "...you felt so good or so hyper that other people thought you were not your normal self or you were so hyper that you got into trouble?",
          "options": [
            {"response": "Yes", "score": 1},
            {"response": "No", "score": 0}
          ]
        },
        {
          "question": "...you were so irritable that you shouted at people or started fights or arguments?",
          "options": [
            {"response": "Yes", "score": 1},
            {"response": "No", "score": 0}
          ]
        },
        {
          "question": "...you felt much more self-confident than usual?",
          "options": [
            {"response": "Yes", "score": 1},
            {"response": "No", "score": 0}
          ]
        },
        {
          "question": "...you got much less sleep than usual and found you didn’t really miss it?",
          "options": [
            {"response": "Yes", "score": 1},
            {"response": "No", "score": 0}
          ]
        },
        {
          "question": "...you were much more talkative or spoke faster than usual?",
          "options": [
            {"response": "Yes", "score": 1},
            {"response": "No", "score": 0}
          ]
        },
        {
          "question": "...thoughts raced through your head or you couldn’t slow your mind down?",
          "options": [
            {"response": "Yes", "score": 1},
            {"response": "No", "score": 0}
          ]
        },
        {
          "question": "...you were so easily distracted by things around you that you had trouble concentrating or staying on track?",
          "options": [
            {"response": "Yes", "score": 1},
            {"response": "No", "score": 0}
          ]
        },
        {
          "question": "...you had much more energy than usual?",
          "options": [
            {"response": "Yes", "score": 1},
            {"response": "No", "score": 0}
          ]
        },
        {
          "question": "...you were much more active or did many more things than usual?",
          "options": [
            {"response": "Yes", "score": 1},
            {"response": "No", "score": 0}
          ]
        },
        {
          "question": "...you were much more social or outgoing than usual, for example, you telephoned friends in the middle of the night?",
          "options": [
            {"response": "Yes", "score": 1},
            {"response": "No", "score": 0}
          ]
        },
        {
          "question": "...you were much more interested in sex than usual?",
          "options": [
            {"response": "Yes", "score": 1},
            {"response": "No", "score": 0}
          ]
        },
        {
          "question": "...you did things that were unusual for you or that other people might have thought were excessive, foolish, or risky?",
          "options": [
            {"response": "Yes", "score": 1},
            {"response": "No", "score": 0}
          ]
        },
        {
          "question": "...spending money got you or your family into trouble?",
          "options": [
            {"response": "Yes", "score": 1},
            {"response": "No", "score": 0}
          ]
        },
        {
          "question": "If you checked YES to more than one of the above, have several of these ever happened during the same period of time?",
          "options": [
            {"response": "No problem", "score": 0},
            {"response": "Minor problem", "score": 1},
            {"response": "Moderate problem", "score": 2},
            {"response": "Serious problem", "score": 3}
          ]
        },
        {
          "question": "How much of a problem did any of these cause you — like being unable to work; having family, money, or legal troubles; getting into arguments or fights?",
          "options": [
            {"response": "No problem", "score": 0},
            {"response": "Minor problem", "score": 1},
            {"response": "Moderate problem", "score": 2},
            {"response": "Serious problem", "score": 3}
          ]
        }
      ]
        return bipolar;      
   }
    SchizophreniaTest(){
        const schizophrenia=[
            {
              "title": "In the past month, have you had the following thoughts, feelings, or experiences? Check “yes” or “no” for each item.",
              "question": "Do familiar surroundings sometimes seem strange, confusing, threatening, or unreal to you?",
              "options": [
                {"response": "NO", "score": 0},
                {"response": "YES", "score": 1}
              ]
            },
            {
              "question": "Have you heard unusual sounds like banging, clicking, hissing, clapping, or ringing in your ears?",
              "options": [
                {"response": "NO", "score": 0},
                {"response": "YES", "score": 1}
              ]
            },
            {
              "question": "Do things that you see appear different from the way they usually do?",
              "options": [
                {"response": "NO", "score": 0},
                {"response": "YES", "score": 1}
              ]
            },
            {
              "question": "Have you had experiences with telepathy, psychic forces, or fortune-telling?",
              "options": [
                {"response": "NO", "score": 0},
                {"response": "YES", "score": 1}
              ]
            },
            {
              "question": "Have you felt that you are not in control of your own ideas or thoughts?",
              "options": [
                {"response": "NO", "score": 0},
                {"response": "YES", "score": 1}
              ]
            },
            {
              "question": "Do you have difficulty getting your point across because you ramble or go off the track a lot when you talk?",
              "options": [
                {"response": "NO", "score": 0},
                {"response": "YES", "score": 1}
              ]
            },
            {
              "question": "Do you have strong feelings or beliefs about being unusually gifted or talented in some way?",
              "options": [
                {"response": "NO", "score": 0},
                {"response": "YES", "score": 1}
              ]
            },
            {
              "question": "Do you feel that other people are watching you or talking about you?",
              "options": [
                {"response": "NO", "score": 0},
                {"response": "YES", "score": 1}
              ]
            },
            {
              "question": "Do you sometimes get strange feelings on or just beneath your skin, like bugs crawling?",
              "options": [
                {"response": "NO", "score": 0},
                {"response": "YES", "score": 1}
              ]
            },
            {
              "question": "Do you sometimes feel suddenly distracted by distant sounds that you are not normally aware of?",
              "options": [
                {"response": "NO", "score": 0},
                {"response": "YES", "score": 1}
              ]
            },
            {
              "question": "Have you had the sense that some person or force is around you, although you couldn’t see anyone?",
              "options": [
                {"response": "NO", "score": 0},
                {"response": "YES", "score": 1}
              ]
            },
            {
              "question": "Do you worry at times that something may be wrong with your mind?",
              "options": [
                {"response": "NO", "score": 0},
                {"response": "YES", "score": 1}
              ]
            },
            {
              "question": "Have you ever felt that you don't exist, the world does not exist, or that you are dead?",
              "options": [
                {"response": "NO", "score": 0},
                {"response": "YES", "score": 1}
              ]
            },
            {
              "question": "Have you been confused at times whether something you experienced was real or imaginary?",
              "options": [
                {"response": "NO", "score": 0},
                {"response": "YES", "score": 1}
              ]
            },
            {
              "question": "Do you hold beliefs that other people would find unusual or bizarre?",
              "options": [
                {"response": "NO", "score": 0},
                {"response": "YES", "score": 1}
              ]
            },
            {
              "question": "Do you feel that parts of your body have changed in some way, or that parts of your body are working differently?",
              "options": [
                {"response": "NO", "score": 0},
                {"response": "YES", "score": 1}
              ]
            },
            {
              "question": "Are your thoughts sometimes so strong that you can almost hear them?",
              "options": [
                {"response": "NO", "score": 0},
                {"response": "YES", "score": 1}
              ]
            },
            {
              "question": "Do you find yourself feeling mistrustful or suspicious of other people?",
              "options": [
                {"response": "NO", "score": 0},
                {"response": "YES", "score": 1}
              ]
            },
            {
              "question": "Have you seen unusual things like flashes, flames, blinding light, or geometric figures?",
              "options": [
                {"response": "NO", "score": 0},
                {"response": "YES", "score": 1}
              ]
            },
            {
              "question": "Have you seen things that other people can't see or don't seem to see?",
              "options": [
                {"response": "NO", "score": 0},
                {"response": "YES", "score": 1}
              ]
            },
            {
              "question": "Do people sometimes find it hard to understand what you are saying?",
              "options": [
                {"response": "NO", "score": 0},
                {"response": "YES", "score": 1}
              ]
            }
          ]
         return schizophrenia; 
    }
};
const TestQna = new TestQuestions();
export default TestQna;