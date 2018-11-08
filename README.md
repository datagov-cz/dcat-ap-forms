# LinkedPipes DCAT-AP Forms
DCAT-AP v1.1 compatible web form producing JSON-LD, intended for the [Czech National Open Data](https://data.gov.cz) catalog.

## Installation

Create cores:
```
solr.cmd create -c iana-media-types
solr.cmd create -c mdr-file-type
solr.cmd create -c ruian
solr.cmd create -c eurovoc
solr.cmd create -c dataset-themes
```

Set core properties:
```
curl http://localhost:8983/solr/iana-media-types/config -H 'Content-type:application/json' -d '{
    "set-user-property": {"update.autoCreateFields":"false"},
    "set-property" : {"requestDispatcher.requestParsers.enableRemoteStreaming":true},
    "set-property" : {"requestDispatcher.requestParsers.enableStreamBody":true}
}'

curl http://localhost:8983/solr/mdr-file-type/config -H 'Content-type:application/json' -d '{
    "set-user-property": {"update.autoCreateFields":"false"},
    "set-property" : {"requestDispatcher.requestParsers.enableRemoteStreaming":true},
    "set-property" : {"requestDispatcher.requestParsers.enableStreamBody":true}
}'

curl http://localhost:8983/solr/ruian/config -H 'Content-type:application/json' -d '{
    "set-user-property": {"update.autoCreateFields":"false"},
    "set-property" : {"requestDispatcher.requestParsers.enableRemoteStreaming":true},
    "set-property" : {"requestDispatcher.requestParsers.enableStreamBody":true}
}'

curl http://localhost:8983/solr/eurovoc/config -H 'Content-type:application/json' -d '{
    "set-user-property": {"update.autoCreateFields":"false"},
    "set-property" : {"requestDispatcher.requestParsers.enableRemoteStreaming":true},
    "set-property" : {"requestDispatcher.requestParsers.enableStreamBody":true}
}'

```


Create schema:
```
curl http://localhost:8983/solr/iana-media-types/schema -X POST -H 'Content-type:application/json' --data-binary '{
    "add-field-type": {"name": "text", "class": "solr.TextField", "positionIncrementGap": "100", "analyzer": {
        "tokenizer": {"class":"solr.WhitespaceTokenizerFactory"},
        "filters": [{"class":"solr.LowerCaseFilterFactory"}]
    }},
    "add-field": {"name": "code", "type": "string" , "indexed": true, "docValues": false},
    "add-field": {"name": "cs", "type": "text" , "indexed": true, "docValues": false},
    "add-field": {"name": "en", "type": "text" , "indexed": true, "docValues": false},
    "add-field": {"name": "priority", "type": "pint" , "indexed": true, "docValues": true}    
}'

curl http://localhost:8983/solr/mdr-file-type/schema -X POST -H 'Content-type:application/json' --data-binary '{
    "add-field-type": {"name": "text", "class": "solr.TextField", "positionIncrementGap": "100", "analyzer": {
        "tokenizer": {"class":"solr.WhitespaceTokenizerFactory"},
        "filters": [{"class":"solr.LowerCaseFilterFactory"}]
    }},
    "add-field": {"name": "code", "type": "string" , "indexed": true, "docValues": false},
    "add-field": {"name": "cs", "type": "text" , "indexed": true, "docValues": false},
    "add-field": {"name": "en", "type": "text" , "indexed": true, "docValues": false},
    "add-field": {"name": "priority", "type": "pint" , "indexed": true, "docValues": true}    
}'

curl http://localhost:8983/solr/ruian/schema -X POST -H 'Content-type:application/json' --data-binary '{
    "add-field-type": {"name": "ascii_text", "class": "solr.TextField", "positionIncrementGap": "100", "analyzer": {
        "tokenizer": {"class":"solr.WhitespaceTokenizerFactory"},
        "filters": [
            {"class":"solr.LowerCaseFilterFactory"},
            {"class":"solr.ASCIIFoldingFilterFactory"}
        ]
    }},
    "add-field": {"name": "code", "type": "string" , "indexed": true, "docValues": false},
    "add-field": {"name": "notation", "type": "string" , "indexed": false, "docValues": false},    
    "add-field": {"name": "cs", "type": "text" , "indexed": true, "docValues": false},
    "add-field": {"name": "en", "type": "text" , "indexed": true, "docValues": false},
}'

curl http://localhost:8983/solr/eurovoc/schema -X POST -H 'Content-type:application/json' --data-binary '{
    "add-field-type": {"name": "ascii_text", "class": "solr.TextField", "positionIncrementGap": "100", "analyzer": {
        "tokenizer": {"class":"solr.WhitespaceTokenizerFactory"},
        "filters": [
            {"class":"solr.LowerCaseFilterFactory"},
            {"class":"solr.ASCIIFoldingFilterFactory"}
        ]
    }},
    "add-field": {"name": "code", "type": "string" , "indexed": true, "docValues": false},
    "add-field": {"name": "notation", "type": "string" , "indexed": false, "docValues": false},    
    "add-field": {"name": "cs", "type": "text" , "indexed": true, "docValues": false},
    "add-field": {"name": "en", "type": "text" , "indexed": true, "docValues": false},
}'

```
