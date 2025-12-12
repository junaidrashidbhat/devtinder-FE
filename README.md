//DevTinder
1.Created a Vite + react project
2.Created hello world in app.js / removed default code
3.Git init
4.Daisy UI and Tailwind Css for designing our components
5.Add a header/nav bar / create separate files
6.Install / use reactRouterSetup=routing 7. Create Browser Router > Routes > Route > ChiledrenRoute
8.Create an outlet in your body componenet
9.Create a footer 10. Create login page
11.Install axios
11.Cors- install cors in backend => add middle to withConfifurations:origin, credentials:true
12.Whenver ur making api call pass axios => {withCredentials:true}
13.Install redux toolkit { npm install @reduxjs/toolkit react-redux }
14.Configure store => provider(app.jsx)=>> createSlice --> add reducer to store 15. Add redux dev tools and see the data 16. Navbar should update with user data as soon as you login
17.Redirect user to feed after login
18.Api for maintaining user data on reload
19.navigating the user to /login if tokn not present
20.Createlogout and redirect to /login (Do validation for user input) 21. Feed fetching and storing in the store 22. Creating feed page and handling ignore/ accept 23. Edit/view profile (with realtime card) 24. Feature / all my connections /accept requests 25. send requests in feed Ignore / intrested
26.Signup new users

#DEployment

1.  Signup on aws
    2.LAunch instance
    3.Chmod 400 <secret>.pem
    4.ssh-i <secret>
2.  Install node version (same as machine)
    6.Git clone on the remote (aws)
    7.Npm install
    8.npm run build 9. sudo apt install nginx 10. systemctl start nginx 11. systemctl enable nginx
    12.Copy code from dist (build files) to /var/www/html/ 13. sudo scp -r dist/\* /var/www/html

    enable port 80 of your instance

    #backend deployment
    1. http://13.62.222.59:3000  ------server
    2. http://13.62.222.59 ---frontend

         Body
         navbar

            -----route=/ Feed
            -----route= /login =>login
            -----route = /connections= connections
            -----route = /profile => profile
