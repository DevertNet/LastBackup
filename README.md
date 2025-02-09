# LastBackup
Imagine you are on vacation and all your luggage is stolen.
Do you know important phone numbers or bank details by heart? I don't know these things. 

That's why I created a backup solution where you can store important things with as little data as possible.

Why not use a normal cloud? I have protected most services with 2 factor authentication. If I lose my phone and laptop I can't access them anymore.

![deploy](https://github.com/DevertNet/LastBackup/workflows/deploy/badge.svg)

# IMPORTANT

I have build in a mail alert with a currently fixed mail address:
https://github.com/DevertNet/LastBackup/blob/master/src/api/Controller/Storage.php#L32

No password or URL is transmitted, only the hash.
As the tool is only used by me (so far), I have not made the e-mail address configurable. 

Feel free to write me an e-mail or create an issue if you want me to change it :)

## Production Build
`npm install && composer install`  
`npm run build && npm run-build-api`  

File Structure:
- /home/lastbackup/
- /home/lastbackup/htdocs/ (Content from .dist folder)
- /home/lastbackup/htdocs/public/ (Document Root)
- /home/lastbackup/htdocs/public/api/
- /home/lastbackup/htdocs/src/
- /home/lastbackup/htdocs/src/api/
- /home/lastbackup/htdocs/vendor/
- /home/lastbackup/storage/ (Storage of encrypted backups)

## Development - Frontend
Launch local dev server:
`npm install`   
`npm start`

## Development - Backend
Launch local dev server:
`composer install`   
`composer start`   

## Thanks
Thanks to @Xiphe for the help with React 😇

## Todo
- API Config File (Maybe PHP for Flysytem)
- - Salt
- - Custom File
- Readme
- - Self Hosting
- API
- - Salt
- Cypress
- Change Password Function
- Delete Backup
- Storage with Flysystem (e.g. Serverless with AWS)
- Favicon
- Composer json anpassen (Author etc.)
