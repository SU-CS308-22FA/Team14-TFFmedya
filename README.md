# Team14-TFFmedya-Test

![This is an image](/src/logo.svg)
# **TFFMedya**

<table>
<tr>
<td>
TFFMedya is a social media web application that is dfeisgned for Turkish Football Federation. It aims to increase the visibility of TFF in the social media and connect the football fans and the federation in a way that users can get involved into the football community more by contributing to the polls, quizzes, evaluation surveys, news etc.
The project has been developed in Django Python v12.2 environment with ReactJS for the frontend, MongoDB for the database system.
</td>
</tr>
</table>

### Table of Contents
+ #### [User Documentation](#userdoc)
  - [Installing the Software](#installandrunsoftware)
  - [Reporting bugs](#reportbugs)
  - [Known bugs](#knownbugs)
+ #### [Develeoper Documentation](#devdoc)
  - [Obtaining the source code](#obtainsource)
  - [Layout of the directory and branching](#layoutdirectory)
  - [Building and deploying](#buildanddeploy)



## User Documentation <a name="userdoc"/>
### Installing the Software <a name="installandrunsoftware"/>
No installation is required. You can just click on the link: (to be changed)
### Reporting bugs <a name="reportbugs"/>
To report a bug, you can mail to tffmedya@hotmail.com
### Known bugs <a name="knownbugs"/>
Users can navigate to login page even if they are logged in.
Forgot password page gets the user credentials from the session, so it looks logged in while filling forgot password form.
## Develeoper Documentation <a name="devdoc"/>
### Obtaining the source code <a name="obtainsource"/>
You can clone the repository, and pull backend and frontend branches seperately.
### Layout of the directory and branching <a name="layoutdirectory"/>
#### Layout
+ FixtureRefresh
  + Includes models & views & serializers for the fixture functions.
+ Polls
  + Includes models & views & serializers for the poll functions.
+ Evaluations
  + Includes models & views & serializers for the evaluation functions.
+ new_front/serc
  + Includes to frontend pages of the website
#### Branching
  + ##### frontend
    The main branch which is to include the latest version of the frontend.
  + ##### backend
    The main branch which is to include the latest version of the backend.
  + ##### dev
    The experimental branch where feature branches are merged after testing.
  + ##### feature branches
    The branches that are to work on the spesific features seperately.
### Building and deploying <a name="buildanddeploy"/>
1. Clone the repository
2. To run the backend server, use the backend branch.
3. Run the following command: 
`pip install -r requirements.txt`
4. To run the server, use the following command:
`python manage.py runserver`
5. To run the frontend, use the frontend branch
6. Run the following commands:
`npm install react-scripts`
`npm start`
