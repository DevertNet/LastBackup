# LastBackup
The very last backup.

![deploy](https://github.com/DevertNet/LastBackup/workflows/deploy/badge.svg)

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

## Todo
- API Config File (Maybe PHP for Flysytem)
- - Salt
- - Custom File
- Readme
- - Self Hosting
- - Thanks to Xiphe
- - Description
- API
- - Salt
- Cypress
- Change Password Function
- Delete Backup
- Storage with Flysystem (e.g. Serverless with AWS)
- Favicon
- Composer json anpassen (Author etc.)
