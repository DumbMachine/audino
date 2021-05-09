## Upload datapoints

The tool provides an end point to add guidelines. You would need an API Key which can be found on the admin dashboard for all projects. To upload datapoints for a project, you would need to make a `POST` request to `/api/data` end point. API Key should be passed in `Authorization` header. Labels for data can also be uploaded.

For every datapoint, we need to provide the following required information:

1. `guidelines`: String format guidelines to be showcased on the project dashboard. Supports `html` as string, `html` rendered using

   ```js
   <div dangerouslySetInnerHTML={{ __html: guidelines }}></div>
   ```

2. `username`: The username to whom this audio needs to be assigned for annotation. It should be one of the users created.

We provide an [example CLI script](../../examples/upload_data/upload_guidelines.py) to show how to upload the datapoints.

For example, you can add data with reference transcripts:

```sh
API_KEY=4595c35d8dfc4ee1a0d3a40ec6c7ccec python3 upload_guidelines.py --host localhost --port 5000 --guidelines "<p>Sample Guidelines for this project.</p><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1E5SKljnQvLKVwFk1dcOTKNBVGvbyDNl_qA&usqp=CAU'/>"
```
