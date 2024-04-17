const { exec } = require('child_process');

// Function to deploy MERN stack app to Heroku
function deployToHeroku() {
    console.log('Deploying MERN stack app to Heroku...');

    // Build the React frontend
    exec('cd client && npm run build', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error building React app: ${error}`);
            return;
        }
        console.log('React app built successfully.');

        // Initialize Git repository
        exec('git init', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error initializing Git repository: ${error}`);
                return;
            }
            console.log('Git repository initialized.');

            // Add and commit changes
            exec('git add . && git commit -m "Initial commit"', (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error committing changes: ${error}`);
                    return;
                }
                console.log('Changes committed.');

                // Create a new Heroku app
                exec('heroku create', (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error creating Heroku app: ${error}`);
                        return;
                    }
                    console.log('Heroku app created.');

                    // Deploy to Heroku
                    exec('git push heroku master', (error, stdout, stderr) => {
                        if (error) {
                            console.error(`Error deploying to Heroku: ${error}`);
                            return;
                        }
                        console.log('App deployed to Heroku.');
                    });
                });
            });
        });
    });
}

deployToHeroku();
