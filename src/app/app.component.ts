import { Component, OnInit } from '@angular/core';

declare var DirectedGraph: any;



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'force-graph';
  relationships:any = [];
  nodes:any = [];
  fullGraphUrl:any = [];
constructor(){
  this.fullGraphUrl = neo4jdata
}
ngOnInit(): void {
  console.log(this.fullGraphUrl)
  this.fullGraphUrl.forEach((data: any) => {
    if (data?.p?.length > 0) {
      data.p.forEach((element: any, index: any) => {
        if (index % 2 == 0) {
          let nodeObject: any = {};
          nodeObject.id = element._id;
          nodeObject.labels = element._labels;
          delete element._id;
          delete element._labels;
          nodeObject.properties = element;
          let index2 = this.nodes.findIndex((x:any) => x.id == nodeObject.id);
          if(index2 === -1)
          this.nodes.push({
            "id": nodeObject.id,
            "labels": nodeObject.labels,
            "properties": nodeObject.properties,
          })
        } else {
          let relationshipObject: any = {};
          relationshipObject.id = element._id;
          relationshipObject.type = element._type;
          relationshipObject.startNode = element._startId;
          relationshipObject.endNode = element._endId;
          delete element._id;
          delete element._type;
          delete element._startId;
          delete element._endId;
          relationshipObject.properties = element;
          let index1 = this.relationships.findIndex((x:any) => x.id == relationshipObject.id);
          if(index1 === -1)
          this.relationships.push({
            "id": relationshipObject.id,
            "type": relationshipObject.type,
            "startNode": relationshipObject.startNode,
            "endNode": relationshipObject.endNode,
            "properties": relationshipObject.properties ? relationshipObject.properties : {}
          })
        }
      })
    }
  });
  DirectedGraph(".content", {
    arrowSize: 7.5,
    relationshipWidth: 1.5,
    nodeRadius: 23,
    nodeCaption: true,
    relationshipCaption: true,
    icons: {Tweet: "fab fa-twitter", User: "fas fa-street-view", Hashtag: "fas fa-hashtag" },
    colors: {Tweet: "#00acee", User: "#54ca74",Hashtag: "#796EFF"},
    nodeExtras: function(node:any) {
        node 
        .attr('cursor', 'pointer')
        .on('click', (n:any) => alert(JSON.stringify(n)))
        && node
        .append("text")
        .attr("dx", 10)
        .attr("dy", ".55em")
        .text(function(d:any) { return d.name;})
        .style('font-size', '10px');
  },
  }).drawGraph({
    nodes:this.nodes,
    relationships: this.relationships,
    
  });
}

}
export var neo4jdata = [
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691434,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1484845
          },
          {
              "_id": 1484845,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE RETAIL LIMITED",
              "name": 784869,
              "cin": "U01100MH1999PLC120563"
          },
          {
              "_id": 13694180,
              "_type": "Subsidiary",
              "_startId": 1484845,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691435,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 4088393
          },
          {
              "_id": 4088393,
              "_labels": [
                  "Company"
              ],
              "companyName": "JIO PLATFORMS LIMITED",
              "name": 2310836,
              "cin": "U72900GJ2019PLC110816"
          },
          {
              "_id": 13726916,
              "_type": "Subsidiary",
              "_startId": 4088393,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691436,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1192480
          },
          {
              "_id": 1192480,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE BRANDS LUXURY FASHION PRIVATE LIMITED",
              "name": 629014,
              "cin": "U74994MH2007PTC335798"
          },
          {
              "_id": 13677587,
              "_type": "Subsidiary",
              "_startId": 1192480,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691437,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 2890304
          },
          {
              "_id": 2890304,
              "_labels": [
                  "Company"
              ],
              "companyName": "GENESIS COLORS LIMITED",
              "name": 1550547,
              "cin": "U51311MH1998PLC335921"
          },
          {
              "_id": 13715732,
              "_type": "Subsidiary",
              "_startId": 2890304,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691438,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1775642
          },
          {
              "_id": 1775642,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE DIGITAL HEALTH LIMITED",
              "name": 935505,
              "cin": "U52599MH2007PLC176414"
          },
          {
              "_id": 13705991,
              "_type": "Subsidiary",
              "_startId": 1775642,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691439,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 3906057
          },
          {
              "_id": 3906057,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE 4IR REALTY DEVELOPMENT LIMITED",
              "name": 2214538,
              "cin": "U70109GJ2019PLC107623"
          },
          {
              "_id": 13726477,
              "_type": "Subsidiary",
              "_startId": 3906057,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691440,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 467505
          },
          {
              "_id": 467505,
              "_labels": [
                  "Company"
              ],
              "companyName": "NOWFLOATS TECHNOLOGIES PRIVATE LIMITED",
              "name": 238909,
              "cin": "U72200TG2012PTC080822"
          },
          {
              "_id": 13652538,
              "_type": "Subsidiary",
              "_startId": 467505,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691441,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 4088395
          },
          {
              "_id": 4088395,
              "_labels": [
                  "Company"
              ],
              "companyName": "JIO LIMITED",
              "name": 2310837,
              "cin": "U72900GJ2019PLC110820"
          },
          {
              "_id": 13726922,
              "_type": "Subsidiary",
              "_startId": 4088395,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691443,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1614500
          },
          {
              "_id": 1614500,
              "_labels": [
                  "Company"
              ],
              "companyName": "GRAB A GRUB SERVICES LIMITED",
              "name": 850831,
              "cin": "U74999MH2014PLC258962"
          },
          {
              "_id": 13698210,
              "_type": "Subsidiary",
              "_startId": 1614500,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691445,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1563227
          },
          {
              "_id": 1563227,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE VENTURES LIMITED",
              "name": 824847,
              "cin": "U24120MH1999PLC121009"
          },
          {
              "_id": 13696707,
              "_type": "Subsidiary",
              "_startId": 1563227,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691447,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 160494
          },
          {
              "_id": 160494,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE SIBUR ELASTOMERS PRIVATE LIMITED",
              "name": 81932,
              "cin": "U25209MH2012PTC310109"
          },
          {
              "_id": 13645453,
              "_type": "Subsidiary",
              "_startId": 160494,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691449,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 3219485
          },
          {
              "_id": 3219485,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE GAS LIFESTYLE INDIA PRIVATE LIMITED",
              "name": 1734596,
              "cin": "U52609MH2017PTC291039"
          },
          {
              "_id": 13718530,
              "_type": "Subsidiary",
              "_startId": 3219485,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691450,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1814036
          },
          {
              "_id": 1814036,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIAL INVESTMENTS AND HOLDINGS LIMITED",
              "name": 955664,
              "cin": "U65910GJ1986PLC106745"
          },
          {
              "_id": 13707702,
              "_type": "Subsidiary",
              "_startId": 1814036,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691450,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1814036
          },
          {
              "_id": 1814036,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIAL INVESTMENTS AND HOLDINGS LIMITED",
              "name": 955664,
              "cin": "U65910GJ1986PLC106745"
          },
          {
              "_id": 13705352,
              "_type": "Subsidiary",
              "_startId": 1758508,
              "_endId": 1814036
          },
          {
              "_id": 1758508,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE COMMERCIAL DEALERS LIMITED",
              "name": 926476,
              "cin": "U51909MH2006PLC166162"
          },
          {
              "_id": 9807027,
              "_type": "Director",
              "_startId": 1758508,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691450,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1814036
          },
          {
              "_id": 1814036,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIAL INVESTMENTS AND HOLDINGS LIMITED",
              "name": 955664,
              "cin": "U65910GJ1986PLC106745"
          },
          {
              "_id": 13710090,
              "_type": "Subsidiary",
              "_startId": 1851673,
              "_endId": 1814036
          },
          {
              "_id": 1851673,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE PETROINVESTMENTS LIMITED",
              "name": 975789,
              "cin": "U72900MH1999PLC121039"
          },
          {
              "_id": 9994418,
              "_type": "Director",
              "_startId": 1851673,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691451,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1793208
          },
          {
              "_id": 1793208,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE GAS PIPELINES LIMITED",
              "name": 944769,
              "cin": "U60300MH1991PLC059678"
          },
          {
              "_id": 13706766,
              "_type": "Subsidiary",
              "_startId": 1793208,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691452,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1656129
          },
          {
              "_id": 1656129,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE SMSL LIMITED",
              "name": 872004,
              "cin": "U74999MH2007PLC167704"
          },
          {
              "_id": 13699804,
              "_type": "Subsidiary",
              "_startId": 1656129,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691453,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1772176
          },
          {
              "_id": 1772176,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE CORPORATE IT PARK LIMITED",
              "name": 933683,
              "cin": "U74140GJ2001PLC107554"
          },
          {
              "_id": 13705353,
              "_type": "Associate",
              "_startId": 1758508,
              "_endId": 1772176
          },
          {
              "_id": 1758508,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE COMMERCIAL DEALERS LIMITED",
              "name": 926476,
              "cin": "U51909MH2006PLC166162"
          },
          {
              "_id": 9807027,
              "_type": "Director",
              "_startId": 1758508,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691453,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1772176
          },
          {
              "_id": 1772176,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE CORPORATE IT PARK LIMITED",
              "name": 933683,
              "cin": "U74140GJ2001PLC107554"
          },
          {
              "_id": 13705848,
              "_type": "Subsidiary",
              "_startId": 1772176,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691454,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1742486
          },
          {
              "_id": 1742486,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE PETRO MARKETING LIMITED",
              "name": 917934,
              "cin": "U74210MH1999PLC120377"
          },
          {
              "_id": 13704735,
              "_type": "Subsidiary",
              "_startId": 1742486,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691456,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1775635
          },
          {
              "_id": 1775635,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE COMTRADE PRIVATE LIMITED",
              "name": 935501,
              "cin": "U52599MH2006PTC164458"
          },
          {
              "_id": 13705986,
              "_type": "Subsidiary",
              "_startId": 1775635,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691457,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1820741
          },
          {
              "_id": 1820741,
              "_labels": [
                  "Company"
              ],
              "companyName": "SURELA INVESTMENT AND TRADING LIMITED",
              "name": 959246,
              "cin": "U65990MH1986PLC041221"
          },
          {
              "_id": 13708134,
              "_type": "Subsidiary",
              "_startId": 1820741,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691458,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1851578
          },
          {
              "_id": 1851578,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE RETAIL INSURANCE BROKING LIMITED",
              "name": 975740,
              "cin": "U67200MH2006PLC165651"
          },
          {
              "_id": 13710082,
              "_type": "Subsidiary",
              "_startId": 1851578,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691459,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 3429027
          },
          {
              "_id": 3429027,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE CONTENT DISTRIBUTION LIMITED",
              "name": 1893185,
              "cin": "U74999MH2017PLC299342"
          },
          {
              "_id": 13719979,
              "_type": "Subsidiary",
              "_startId": 3429027,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691461,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 2199548
          },
          {
              "_id": 2199548,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE BP MOBILITY LIMITED",
              "name": 1186202,
              "cin": "U50100MH2015PLC327401"
          },
          {
              "_id": 13713725,
              "_type": "Subsidiary",
              "_startId": 2199548,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691464,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 3721162
          },
          {
              "_id": 3721162,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE BP MOBILITY LIMITED",
              "name": 2118072,
              "cin": "U50100MH2015PLC327401"
          },
          {
              "_id": 13725240,
              "_type": "Subsidiary",
              "_startId": 3721162,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691465,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1758511
          },
          {
              "_id": 1758511,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE RETAIL VENTURES LIMITED",
              "name": 926478,
              "cin": "U51909MH2006PLC166166"
          },
          {
              "_id": 13705372,
              "_type": "Subsidiary",
              "_startId": 1758511,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691467,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1751454
          },
          {
              "_id": 1751454,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE BRANDS LIMITED",
              "name": 922739,
              "cin": "U51900MH2007PLC174470"
          },
          {
              "_id": 13705074,
              "_type": "Subsidiary",
              "_startId": 1751454,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691468,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1488004
          },
          {
              "_id": 1488004,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE AMBIT TRADE PRIVATE LIMITED",
              "name": 786487,
              "cin": "U01119MH2006PTC162902"
          },
          {
              "_id": 13694263,
              "_type": "Subsidiary",
              "_startId": 1488004,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691469,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1728898
          },
          {
              "_id": 1728898,
              "_labels": [
                  "Company"
              ],
              "companyName": "INDIAWIN SPORTS PRIVATE LIMITED",
              "name": 910765,
              "cin": "U51109MH2007PTC176254"
          },
          {
              "_id": 13704192,
              "_type": "Subsidiary",
              "_startId": 1728898,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691470,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1320628
          },
          {
              "_id": 1320628,
              "_labels": [
                  "Company"
              ],
              "companyName": "GENESIS LA MODE PRIVATE LIMITED",
              "name": 696448,
              "cin": "U51109MH2012PTC335918"
          },
          {
              "_id": 13685109,
              "_type": "Subsidiary",
              "_startId": 1320628,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691471,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 200248
          },
          {
              "_id": 200248,
              "_labels": [
                  "Company"
              ],
              "companyName": "GML INDIA FASHION PRIVATE LIMITED",
              "name": 102076,
              "cin": "U51494MH2012PTC335919"
          },
          {
              "_id": 13647016,
              "_type": "Subsidiary",
              "_startId": 200248,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691472,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 872472
          },
          {
              "_id": 872472,
              "_labels": [
                  "Company"
              ],
              "companyName": "NETMEDS MARKETPLACE LIMITED",
              "name": 446763,
              "cin": "U51505TN2010PLC077105"
          },
          {
              "_id": 13666503,
              "_type": "Subsidiary",
              "_startId": 872472,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691473,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1343616
          },
          {
              "_id": 1343616,
              "_labels": [
                  "Company"
              ],
              "companyName": "GLF LIFESTYLE BRANDS PRIVATE LIMITED",
              "name": 708500,
              "cin": "U51909MH2011PTC335917"
          },
          {
              "_id": 13685628,
              "_type": "Subsidiary",
              "_startId": 1343616,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691474,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 3150435
          },
          {
              "_id": 3150435,
              "_labels": [
                  "Company"
              ],
              "companyName": "JIO PAYMENTS BANK LIMITED",
              "name": 1694718,
              "cin": "U65999MH2016PLC287584"
          },
          {
              "_id": 13717801,
              "_type": "Subsidiary",
              "_startId": 3150435,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691475,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1781771
          },
          {
              "_id": 1781771,
              "_labels": [
                  "Company"
              ],
              "companyName": "FOOTBALL SPORTS DEVELOPMENT LIMITED",
              "name": 938683,
              "cin": "U74120MH2013PLC247778"
          },
          {
              "_id": 13706203,
              "_type": "Subsidiary",
              "_startId": 1781771,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691476,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1936126
          },
          {
              "_id": 1936126,
              "_labels": [
                  "Company"
              ],
              "companyName": "DADHA PHARMA DISTRIBUTION LIMITED",
              "name": 1030500,
              "cin": "U74900TN2015PLC102202"
          },
          {
              "_id": 13711999,
              "_type": "Subsidiary",
              "_startId": 1936126,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691477,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 176009
          },
          {
              "_id": 176009,
              "_labels": [
                  "Company"
              ],
              "companyName": "INDIAVIDUAL LEARNING LIMITED",
              "name": 89788,
              "cin": "U80301KA2012PLC107575"
          },
          {
              "_id": 13645890,
              "_type": "Subsidiary",
              "_startId": 176009,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691478,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1324650
          },
          {
              "_id": 1324650,
              "_labels": [
                  "Company"
              ],
              "companyName": "GLB BODY CARE PRIVATE LIMITED",
              "name": 698552,
              "cin": "U51391MH2012PTC335920"
          },
          {
              "_id": 13685197,
              "_type": "Subsidiary",
              "_startId": 1324650,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691479,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 679894
          },
          {
              "_id": 679894,
              "_labels": [
                  "Company"
              ],
              "companyName": "C-SQUARE INFO-SOLUTIONS LIMITED",
              "name": 347854,
              "cin": "U72900KA2002PLC030784"
          },
          {
              "_id": 13659439,
              "_type": "Subsidiary",
              "_startId": 679894,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691483,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1751638
          },
          {
              "_id": 1751638,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE-GRANDOPTICAL PRIVATE LIMITED",
              "name": 922837,
              "cin": "U51900MH2007PTC175638"
          },
          {
              "_id": 13705085,
              "_type": "Subsidiary",
              "_startId": 1751638,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691484,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1758510
          },
          {
              "_id": 1758510,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE TRADING LIMITED",
              "name": 926477,
              "cin": "U51909MH2006PLC166165"
          },
          {
              "_id": 13705360,
              "_type": "Subsidiary",
              "_startId": 1758510,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691485,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1533302
          },
          {
              "_id": 1533302,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE CLOTHING INDIA LIMITED",
              "name": 809552,
              "cin": "U17120MH2008PLC180384"
          },
          {
              "_id": 13695673,
              "_type": "Subsidiary",
              "_startId": 1533302,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691486,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1758508
          },
          {
              "_id": 1758508,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE COMMERCIAL DEALERS LIMITED",
              "name": 926476,
              "cin": "U51909MH2006PLC166162"
          },
          {
              "_id": 13705354,
              "_type": "Subsidiary",
              "_startId": 1758508,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691486,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1758508
          },
          {
              "_id": 1758508,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE COMMERCIAL DEALERS LIMITED",
              "name": 926476,
              "cin": "U51909MH2006PLC166162"
          },
          {
              "_id": 13705355,
              "_type": "Associate",
              "_startId": 1758508,
              "_endId": 1851673
          },
          {
              "_id": 1851673,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE PETROINVESTMENTS LIMITED",
              "name": 975789,
              "cin": "U72900MH1999PLC121039"
          },
          {
              "_id": 9994418,
              "_type": "Director",
              "_startId": 1851673,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691487,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 129743
          },
          {
              "_id": 129743,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE VANTAGE RETAIL LIMITED",
              "name": 65994,
              "cin": "U51109MH2007PLC307506"
          },
          {
              "_id": 13644053,
              "_type": "Subsidiary",
              "_startId": 129743,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691488,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1824854
          },
          {
              "_id": 1824854,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE STRATEGIC INVESTMENTS LIMITED",
              "name": 961490,
              "cin": "U65990MH1999PLC120918"
          },
          {
              "_id": 13705356,
              "_type": "Associate",
              "_startId": 1758508,
              "_endId": 1824854
          },
          {
              "_id": 1758508,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE COMMERCIAL DEALERS LIMITED",
              "name": 926476,
              "cin": "U51909MH2006PLC166162"
          },
          {
              "_id": 9807027,
              "_type": "Director",
              "_startId": 1758508,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691488,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1824854
          },
          {
              "_id": 1824854,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE STRATEGIC INVESTMENTS LIMITED",
              "name": 961490,
              "cin": "U65990MH1999PLC120918"
          },
          {
              "_id": 13708427,
              "_type": "Subsidiary",
              "_startId": 1824854,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691488,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1824854
          },
          {
              "_id": 1824854,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE STRATEGIC INVESTMENTS LIMITED",
              "name": 961490,
              "cin": "U65990MH1999PLC120918"
          },
          {
              "_id": 13708428,
              "_type": "Holding",
              "_startId": 1824854,
              "_endId": 1851673
          },
          {
              "_id": 1851673,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE PETROINVESTMENTS LIMITED",
              "name": 975789,
              "cin": "U72900MH1999PLC121039"
          },
          {
              "_id": 9994418,
              "_type": "Director",
              "_startId": 1851673,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691488,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1824854
          },
          {
              "_id": 1824854,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE STRATEGIC INVESTMENTS LIMITED",
              "name": 961490,
              "cin": "U65990MH1999PLC120918"
          },
          {
              "_id": 13710092,
              "_type": "Subsidiary",
              "_startId": 1851673,
              "_endId": 1824854
          },
          {
              "_id": 1851673,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE PETROINVESTMENTS LIMITED",
              "name": 975789,
              "cin": "U72900MH1999PLC121039"
          },
          {
              "_id": 9994418,
              "_type": "Director",
              "_startId": 1851673,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691489,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 3500582
          },
          {
              "_id": 3500582,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE PROGRESSIVE TRADERS PRIVATE LIMITED",
              "name": 1931223,
              "cin": "U51100MH2005PTC302792"
          },
          {
              "_id": 13723612,
              "_type": "Subsidiary",
              "_startId": 3500582,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691491,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 3554129
          },
          {
              "_id": 3554129,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE JIO MESSAGING SERVICES LIMITED",
              "name": 1960597,
              "cin": "U32204GJ2013PLC107561"
          },
          {
              "_id": 13723978,
              "_type": "Subsidiary",
              "_startId": 3554129,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691493,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 3500581
          },
          {
              "_id": 3500581,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE PROLIFIC TRADERS PRIVATE LIMITED",
              "name": 1931222,
              "cin": "U51100MH2005PTC302788"
          },
          {
              "_id": 13723609,
              "_type": "Subsidiary",
              "_startId": 3500581,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691494,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 3500583
          },
          {
              "_id": 3500583,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE UNIVERSAL TRADERS PRIVATE LIMITED",
              "name": 1931224,
              "cin": "U51100MH2005PTC302789"
          },
          {
              "_id": 13723615,
              "_type": "Subsidiary",
              "_startId": 3500583,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691496,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1488970
          },
          {
              "_id": 1488970,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE PROLIFIC COMMERCIAL PRIVATE LIMITED",
              "name": 786976,
              "cin": "U01122MH2006PTC161600"
          },
          {
              "_id": 13694288,
              "_type": "Subsidiary",
              "_startId": 1488970,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691497,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 130931
          },
          {
              "_id": 130931,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE EMINENT TRADING u0026 COMMERCIAL PRIVATE LIMITED",
              "name": 66603,
              "cin": "U51100MH2005PTC302793"
          },
          {
              "_id": 13644082,
              "_type": "Subsidiary",
              "_startId": 130931,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691498,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 130943
          },
          {
              "_id": 130943,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE UNIVERSAL TRADERS PRIVATE LIMITED",
              "name": 66609,
              "cin": "U51100MH2005PTC302789"
          },
          {
              "_id": 13644085,
              "_type": "Subsidiary",
              "_startId": 130943,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691499,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 130947
          },
          {
              "_id": 130947,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE PROLIFIC TRADERS PRIVATE LIMITED",
              "name": 66611,
              "cin": "U51100MH2005PTC302788"
          },
          {
              "_id": 13644091,
              "_type": "Subsidiary",
              "_startId": 130947,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691500,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 130945
          },
          {
              "_id": 130945,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE PROGRESSIVE TRADERS PRIVATE LIMITED",
              "name": 66610,
              "cin": "U51100MH2005PTC302792"
          },
          {
              "_id": 13644088,
              "_type": "Subsidiary",
              "_startId": 130945,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691501,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1494972
          },
          {
              "_id": 1494972,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE LIFESTYLE HOLDINGS LIMITED",
              "name": 790024,
              "cin": "U01403MH2007PLC172415"
          },
          {
              "_id": 13694504,
              "_type": "Subsidiary",
              "_startId": 1494972,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691502,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1652878
          },
          {
              "_id": 1652878,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE SUPPLY SOLUTIONS PRIVATE LIMITED",
              "name": 870286,
              "cin": "U36991MH1999PTC119874"
          },
          {
              "_id": 13699388,
              "_type": "Subsidiary",
              "_startId": 1652878,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691503,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1658015
          },
          {
              "_id": 1658015,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE ENERGY GENERATION AND DISTRIBUTION LIMITED",
              "name": 873005,
              "cin": "U40108MH2008PLC185326"
          },
          {
              "_id": 13700102,
              "_type": "Subsidiary",
              "_startId": 1658015,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691504,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1640162
          },
          {
              "_id": 1640162,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE JIO MESSAGING SERVICES LIMITED",
              "name": 863825,
              "cin": "U32204GJ2013PLC107561"
          },
          {
              "_id": 13698859,
              "_type": "Subsidiary",
              "_startId": 1640162,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691505,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1729016
          },
          {
              "_id": 1729016,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE COMMERCIAL LAND u0026 INFRASTRUCTURE LIMITED",
              "name": 910828,
              "cin": "U51109MH2008PLC185389"
          },
          {
              "_id": 13704210,
              "_type": "Subsidiary",
              "_startId": 1729016,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691507,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1554814
          },
          {
              "_id": 1554814,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE LNG LIMITED",
              "name": 820592,
              "cin": "U23203MH2000PLC127885"
          },
          {
              "_id": 13696411,
              "_type": "Associate",
              "_startId": 1554814,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691507,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1554814
          },
          {
              "_id": 1554814,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE LNG LIMITED",
              "name": 820592,
              "cin": "U23203MH2000PLC127885"
          },
          {
              "_id": 13696412,
              "_type": "Subsidiary",
              "_startId": 1554814,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691511,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1112688
          },
          {
              "_id": 1112688,
              "_labels": [
                  "Company"
              ],
              "companyName": "NETWORK18 MEDIA u0026 INVESTMENTS LIMITED",
              "name": 589011,
              "cin": "L65910MH1996PLC280969"
          },
          {
              "_id": 13674557,
              "_type": "Holding",
              "_startId": 1112688,
              "_endId": 1113491
          },
          {
              "_id": 1113491,
              "_labels": [
                  "Company"
              ],
              "companyName": "TV18 BROADCAST LIMITED",
              "name": 589403,
              "cin": "L74300MH2005PLC281753"
          },
          {
              "_id": 8483197,
              "_type": "Director",
              "_startId": 1113491,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691511,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1112688
          },
          {
              "_id": 1112688,
              "_labels": [
                  "Company"
              ],
              "companyName": "NETWORK18 MEDIA u0026 INVESTMENTS LIMITED",
              "name": 589011,
              "cin": "L65910MH1996PLC280969"
          },
          {
              "_id": 13674556,
              "_type": "Holding",
              "_startId": 1112688,
              "_endId": 1562643
          },
          {
              "_id": 1562643,
              "_labels": [
                  "Company"
              ],
              "companyName": "VIACOM 18 MEDIA PRIVATE LIMITED",
              "name": 824553,
              "cin": "U92100MH1995PTC095508"
          },
          {
              "_id": 9419054,
              "_type": "Director",
              "_startId": 1562643,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691511,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1112688
          },
          {
              "_id": 1112688,
              "_labels": [
                  "Company"
              ],
              "companyName": "NETWORK18 MEDIA u0026 INVESTMENTS LIMITED",
              "name": 589011,
              "cin": "L65910MH1996PLC280969"
          },
          {
              "_id": 13674754,
              "_type": "Subsidiary",
              "_startId": 1113491,
              "_endId": 1112688
          },
          {
              "_id": 1113491,
              "_labels": [
                  "Company"
              ],
              "companyName": "TV18 BROADCAST LIMITED",
              "name": 589403,
              "cin": "L74300MH2005PLC281753"
          },
          {
              "_id": 8483197,
              "_type": "Director",
              "_startId": 1113491,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691511,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1112688
          },
          {
              "_id": 1112688,
              "_labels": [
                  "Company"
              ],
              "companyName": "NETWORK18 MEDIA u0026 INVESTMENTS LIMITED",
              "name": 589011,
              "cin": "L65910MH1996PLC280969"
          },
          {
              "_id": 13696689,
              "_type": "Subsidiary",
              "_startId": 1562643,
              "_endId": 1112688
          },
          {
              "_id": 1562643,
              "_labels": [
                  "Company"
              ],
              "companyName": "VIACOM 18 MEDIA PRIVATE LIMITED",
              "name": 824553,
              "cin": "U92100MH1995PTC095508"
          },
          {
              "_id": 9419054,
              "_type": "Director",
              "_startId": 1562643,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691433,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1837112
          },
          {
              "_id": 1837112,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE JIO INFOCOMM LIMITED",
              "name": 967864,
              "cin": "U72900GJ2007PLC105869"
          },
          {
              "_id": 13709109,
              "_type": "Subsidiary",
              "_startId": 1837112,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13691492,
              "_type": "Associate",
              "_startId": 1478544,
              "_endId": 180892
          },
          {
              "_id": 180892,
              "_labels": [
                  "Company"
              ],
              "companyName": "INDIAN VACCINES CORPORATION LIMITED",
              "name": 92206,
              "cin": "U74900HR1989GOI030516"
          },
          {
              "_id": 13646425,
              "_type": "Associate",
              "_startId": 180892,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13646425,
              "_type": "Associate",
              "_startId": 180892,
              "_endId": 1478544
          },
          {
              "_id": 180892,
              "_labels": [
                  "Company"
              ],
              "companyName": "INDIAN VACCINES CORPORATION LIMITED",
              "name": 92206,
              "cin": "U74900HR1989GOI030516"
          },
          {
              "_id": 13691492,
              "_type": "Associate",
              "_startId": 1478544,
              "_endId": 180892
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13696411,
              "_type": "Associate",
              "_startId": 1554814,
              "_endId": 1478544
          },
          {
              "_id": 1554814,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE LNG LIMITED",
              "name": 820592,
              "cin": "U23203MH2000PLC127885"
          },
          {
              "_id": 13691507,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1554814
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13696411,
              "_type": "Associate",
              "_startId": 1554814,
              "_endId": 1478544
          },
          {
              "_id": 1554814,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE LNG LIMITED",
              "name": 820592,
              "cin": "U23203MH2000PLC127885"
          },
          {
              "_id": 13696412,
              "_type": "Subsidiary",
              "_startId": 1554814,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13644082,
              "_type": "Subsidiary",
              "_startId": 130931,
              "_endId": 1478544
          },
          {
              "_id": 130931,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE EMINENT TRADING u0026 COMMERCIAL PRIVATE LIMITED",
              "name": 66603,
              "cin": "U51100MH2005PTC302793"
          },
          {
              "_id": 13691497,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 130931
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13644085,
              "_type": "Subsidiary",
              "_startId": 130943,
              "_endId": 1478544
          },
          {
              "_id": 130943,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE UNIVERSAL TRADERS PRIVATE LIMITED",
              "name": 66609,
              "cin": "U51100MH2005PTC302789"
          },
          {
              "_id": 13691498,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 130943
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13644088,
              "_type": "Subsidiary",
              "_startId": 130945,
              "_endId": 1478544
          },
          {
              "_id": 130945,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE PROGRESSIVE TRADERS PRIVATE LIMITED",
              "name": 66610,
              "cin": "U51100MH2005PTC302792"
          },
          {
              "_id": 13691500,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 130945
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13644091,
              "_type": "Subsidiary",
              "_startId": 130947,
              "_endId": 1478544
          },
          {
              "_id": 130947,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE PROLIFIC TRADERS PRIVATE LIMITED",
              "name": 66611,
              "cin": "U51100MH2005PTC302788"
          },
          {
              "_id": 13691499,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 130947
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13645453,
              "_type": "Subsidiary",
              "_startId": 160494,
              "_endId": 1478544
          },
          {
              "_id": 160494,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE SIBUR ELASTOMERS PRIVATE LIMITED",
              "name": 81932,
              "cin": "U25209MH2012PTC310109"
          },
          {
              "_id": 13691447,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 160494
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13645890,
              "_type": "Subsidiary",
              "_startId": 176009,
              "_endId": 1478544
          },
          {
              "_id": 176009,
              "_labels": [
                  "Company"
              ],
              "companyName": "INDIAVIDUAL LEARNING LIMITED",
              "name": 89788,
              "cin": "U80301KA2012PLC107575"
          },
          {
              "_id": 13691477,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 176009
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13647016,
              "_type": "Subsidiary",
              "_startId": 200248,
              "_endId": 1478544
          },
          {
              "_id": 200248,
              "_labels": [
                  "Company"
              ],
              "companyName": "GML INDIA FASHION PRIVATE LIMITED",
              "name": 102076,
              "cin": "U51494MH2012PTC335919"
          },
          {
              "_id": 13691471,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 200248
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13652538,
              "_type": "Subsidiary",
              "_startId": 467505,
              "_endId": 1478544
          },
          {
              "_id": 467505,
              "_labels": [
                  "Company"
              ],
              "companyName": "NOWFLOATS TECHNOLOGIES PRIVATE LIMITED",
              "name": 238909,
              "cin": "U72200TG2012PTC080822"
          },
          {
              "_id": 13691440,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 467505
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13659439,
              "_type": "Subsidiary",
              "_startId": 679894,
              "_endId": 1478544
          },
          {
              "_id": 679894,
              "_labels": [
                  "Company"
              ],
              "companyName": "C-SQUARE INFO-SOLUTIONS LIMITED",
              "name": 347854,
              "cin": "U72900KA2002PLC030784"
          },
          {
              "_id": 13691479,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 679894
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13666503,
              "_type": "Subsidiary",
              "_startId": 872472,
              "_endId": 1478544
          },
          {
              "_id": 872472,
              "_labels": [
                  "Company"
              ],
              "companyName": "NETMEDS MARKETPLACE LIMITED",
              "name": 446763,
              "cin": "U51505TN2010PLC077105"
          },
          {
              "_id": 13691472,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 872472
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13677587,
              "_type": "Subsidiary",
              "_startId": 1192480,
              "_endId": 1478544
          },
          {
              "_id": 1192480,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE BRANDS LUXURY FASHION PRIVATE LIMITED",
              "name": 629014,
              "cin": "U74994MH2007PTC335798"
          },
          {
              "_id": 13691436,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1192480
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13685109,
              "_type": "Subsidiary",
              "_startId": 1320628,
              "_endId": 1478544
          },
          {
              "_id": 1320628,
              "_labels": [
                  "Company"
              ],
              "companyName": "GENESIS LA MODE PRIVATE LIMITED",
              "name": 696448,
              "cin": "U51109MH2012PTC335918"
          },
          {
              "_id": 13691470,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1320628
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13685197,
              "_type": "Subsidiary",
              "_startId": 1324650,
              "_endId": 1478544
          },
          {
              "_id": 1324650,
              "_labels": [
                  "Company"
              ],
              "companyName": "GLB BODY CARE PRIVATE LIMITED",
              "name": 698552,
              "cin": "U51391MH2012PTC335920"
          },
          {
              "_id": 13691478,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1324650
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13685628,
              "_type": "Subsidiary",
              "_startId": 1343616,
              "_endId": 1478544
          },
          {
              "_id": 1343616,
              "_labels": [
                  "Company"
              ],
              "companyName": "GLF LIFESTYLE BRANDS PRIVATE LIMITED",
              "name": 708500,
              "cin": "U51909MH2011PTC335917"
          },
          {
              "_id": 13691473,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1343616
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13694180,
              "_type": "Subsidiary",
              "_startId": 1484845,
              "_endId": 1478544
          },
          {
              "_id": 1484845,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE RETAIL LIMITED",
              "name": 784869,
              "cin": "U01100MH1999PLC120563"
          },
          {
              "_id": 13691434,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1484845
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13694263,
              "_type": "Subsidiary",
              "_startId": 1488004,
              "_endId": 1478544
          },
          {
              "_id": 1488004,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE AMBIT TRADE PRIVATE LIMITED",
              "name": 786487,
              "cin": "U01119MH2006PTC162902"
          },
          {
              "_id": 13691468,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1488004
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13694288,
              "_type": "Subsidiary",
              "_startId": 1488970,
              "_endId": 1478544
          },
          {
              "_id": 1488970,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE PROLIFIC COMMERCIAL PRIVATE LIMITED",
              "name": 786976,
              "cin": "U01122MH2006PTC161600"
          },
          {
              "_id": 13691496,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1488970
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13694504,
              "_type": "Subsidiary",
              "_startId": 1494972,
              "_endId": 1478544
          },
          {
              "_id": 1494972,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE LIFESTYLE HOLDINGS LIMITED",
              "name": 790024,
              "cin": "U01403MH2007PLC172415"
          },
          {
              "_id": 13691501,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1494972
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13695673,
              "_type": "Subsidiary",
              "_startId": 1533302,
              "_endId": 1478544
          },
          {
              "_id": 1533302,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE CLOTHING INDIA LIMITED",
              "name": 809552,
              "cin": "U17120MH2008PLC180384"
          },
          {
              "_id": 13691485,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1533302
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13696412,
              "_type": "Subsidiary",
              "_startId": 1554814,
              "_endId": 1478544
          },
          {
              "_id": 1554814,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE LNG LIMITED",
              "name": 820592,
              "cin": "U23203MH2000PLC127885"
          },
          {
              "_id": 13691507,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1554814
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13696412,
              "_type": "Subsidiary",
              "_startId": 1554814,
              "_endId": 1478544
          },
          {
              "_id": 1554814,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE LNG LIMITED",
              "name": 820592,
              "cin": "U23203MH2000PLC127885"
          },
          {
              "_id": 13696411,
              "_type": "Associate",
              "_startId": 1554814,
              "_endId": 1478544
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13696707,
              "_type": "Subsidiary",
              "_startId": 1563227,
              "_endId": 1478544
          },
          {
              "_id": 1563227,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE VENTURES LIMITED",
              "name": 824847,
              "cin": "U24120MH1999PLC121009"
          },
          {
              "_id": 13691445,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1563227
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13698210,
              "_type": "Subsidiary",
              "_startId": 1614500,
              "_endId": 1478544
          },
          {
              "_id": 1614500,
              "_labels": [
                  "Company"
              ],
              "companyName": "GRAB A GRUB SERVICES LIMITED",
              "name": 850831,
              "cin": "U74999MH2014PLC258962"
          },
          {
              "_id": 13691443,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1614500
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13698859,
              "_type": "Subsidiary",
              "_startId": 1640162,
              "_endId": 1478544
          },
          {
              "_id": 1640162,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE JIO MESSAGING SERVICES LIMITED",
              "name": 863825,
              "cin": "U32204GJ2013PLC107561"
          },
          {
              "_id": 13691504,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1640162
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13699388,
              "_type": "Subsidiary",
              "_startId": 1652878,
              "_endId": 1478544
          },
          {
              "_id": 1652878,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE SUPPLY SOLUTIONS PRIVATE LIMITED",
              "name": 870286,
              "cin": "U36991MH1999PTC119874"
          },
          {
              "_id": 13691502,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1652878
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13699804,
              "_type": "Subsidiary",
              "_startId": 1656129,
              "_endId": 1478544
          },
          {
              "_id": 1656129,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE SMSL LIMITED",
              "name": 872004,
              "cin": "U74999MH2007PLC167704"
          },
          {
              "_id": 13691452,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1656129
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13700102,
              "_type": "Subsidiary",
              "_startId": 1658015,
              "_endId": 1478544
          },
          {
              "_id": 1658015,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE ENERGY GENERATION AND DISTRIBUTION LIMITED",
              "name": 873005,
              "cin": "U40108MH2008PLC185326"
          },
          {
              "_id": 13691503,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1658015
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13704192,
              "_type": "Subsidiary",
              "_startId": 1728898,
              "_endId": 1478544
          },
          {
              "_id": 1728898,
              "_labels": [
                  "Company"
              ],
              "companyName": "INDIAWIN SPORTS PRIVATE LIMITED",
              "name": 910765,
              "cin": "U51109MH2007PTC176254"
          },
          {
              "_id": 13691469,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1728898
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13704210,
              "_type": "Subsidiary",
              "_startId": 1729016,
              "_endId": 1478544
          },
          {
              "_id": 1729016,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE COMMERCIAL LAND u0026 INFRASTRUCTURE LIMITED",
              "name": 910828,
              "cin": "U51109MH2008PLC185389"
          },
          {
              "_id": 13691505,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1729016
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13704735,
              "_type": "Subsidiary",
              "_startId": 1742486,
              "_endId": 1478544
          },
          {
              "_id": 1742486,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE PETRO MARKETING LIMITED",
              "name": 917934,
              "cin": "U74210MH1999PLC120377"
          },
          {
              "_id": 13691454,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1742486
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13705074,
              "_type": "Subsidiary",
              "_startId": 1751454,
              "_endId": 1478544
          },
          {
              "_id": 1751454,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE BRANDS LIMITED",
              "name": 922739,
              "cin": "U51900MH2007PLC174470"
          },
          {
              "_id": 13691467,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1751454
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13705085,
              "_type": "Subsidiary",
              "_startId": 1751638,
              "_endId": 1478544
          },
          {
              "_id": 1751638,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE-GRANDOPTICAL PRIVATE LIMITED",
              "name": 922837,
              "cin": "U51900MH2007PTC175638"
          },
          {
              "_id": 13691483,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1751638
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13705354,
              "_type": "Subsidiary",
              "_startId": 1758508,
              "_endId": 1478544
          },
          {
              "_id": 1758508,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE COMMERCIAL DEALERS LIMITED",
              "name": 926476,
              "cin": "U51909MH2006PLC166162"
          },
          {
              "_id": 13691486,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1758508
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13705354,
              "_type": "Subsidiary",
              "_startId": 1758508,
              "_endId": 1478544
          },
          {
              "_id": 1758508,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE COMMERCIAL DEALERS LIMITED",
              "name": 926476,
              "cin": "U51909MH2006PLC166162"
          },
          {
              "_id": 13705355,
              "_type": "Associate",
              "_startId": 1758508,
              "_endId": 1851673
          },
          {
              "_id": 1851673,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE PETROINVESTMENTS LIMITED",
              "name": 975789,
              "cin": "U72900MH1999PLC121039"
          },
          {
              "_id": 9994418,
              "_type": "Director",
              "_startId": 1851673,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13705360,
              "_type": "Subsidiary",
              "_startId": 1758510,
              "_endId": 1478544
          },
          {
              "_id": 1758510,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE TRADING LIMITED",
              "name": 926477,
              "cin": "U51909MH2006PLC166165"
          },
          {
              "_id": 13691484,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1758510
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13705372,
              "_type": "Subsidiary",
              "_startId": 1758511,
              "_endId": 1478544
          },
          {
              "_id": 1758511,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE RETAIL VENTURES LIMITED",
              "name": 926478,
              "cin": "U51909MH2006PLC166166"
          },
          {
              "_id": 13691465,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1758511
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13705420,
              "_type": "Subsidiary",
              "_startId": 1758939,
              "_endId": 1478544
          },
          {
              "_id": 1758939,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE COMMERCIAL TRADING PRIVATE LIMITED",
              "name": 926712,
              "cin": "U51909MH2006PTC166164"
          },
          {
              "_id": 13705357,
              "_type": "Associate",
              "_startId": 1758508,
              "_endId": 1758939
          },
          {
              "_id": 1758508,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE COMMERCIAL DEALERS LIMITED",
              "name": 926476,
              "cin": "U51909MH2006PLC166162"
          },
          {
              "_id": 9807027,
              "_type": "Director",
              "_startId": 1758508,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13705848,
              "_type": "Subsidiary",
              "_startId": 1772176,
              "_endId": 1478544
          },
          {
              "_id": 1772176,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE CORPORATE IT PARK LIMITED",
              "name": 933683,
              "cin": "U74140GJ2001PLC107554"
          },
          {
              "_id": 13691453,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1772176
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13705848,
              "_type": "Subsidiary",
              "_startId": 1772176,
              "_endId": 1478544
          },
          {
              "_id": 1772176,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE CORPORATE IT PARK LIMITED",
              "name": 933683,
              "cin": "U74140GJ2001PLC107554"
          },
          {
              "_id": 13705353,
              "_type": "Associate",
              "_startId": 1758508,
              "_endId": 1772176
          },
          {
              "_id": 1758508,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE COMMERCIAL DEALERS LIMITED",
              "name": 926476,
              "cin": "U51909MH2006PLC166162"
          },
          {
              "_id": 9807027,
              "_type": "Director",
              "_startId": 1758508,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13705986,
              "_type": "Subsidiary",
              "_startId": 1775635,
              "_endId": 1478544
          },
          {
              "_id": 1775635,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE COMTRADE PRIVATE LIMITED",
              "name": 935501,
              "cin": "U52599MH2006PTC164458"
          },
          {
              "_id": 13691456,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1775635
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13705991,
              "_type": "Subsidiary",
              "_startId": 1775642,
              "_endId": 1478544
          },
          {
              "_id": 1775642,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE DIGITAL HEALTH LIMITED",
              "name": 935505,
              "cin": "U52599MH2007PLC176414"
          },
          {
              "_id": 13691438,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1775642
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13706203,
              "_type": "Subsidiary",
              "_startId": 1781771,
              "_endId": 1478544
          },
          {
              "_id": 1781771,
              "_labels": [
                  "Company"
              ],
              "companyName": "FOOTBALL SPORTS DEVELOPMENT LIMITED",
              "name": 938683,
              "cin": "U74120MH2013PLC247778"
          },
          {
              "_id": 13691475,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1781771
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13706766,
              "_type": "Subsidiary",
              "_startId": 1793208,
              "_endId": 1478544
          },
          {
              "_id": 1793208,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE GAS PIPELINES LIMITED",
              "name": 944769,
              "cin": "U60300MH1991PLC059678"
          },
          {
              "_id": 13691451,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1793208
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13707702,
              "_type": "Subsidiary",
              "_startId": 1814036,
              "_endId": 1478544
          },
          {
              "_id": 1814036,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIAL INVESTMENTS AND HOLDINGS LIMITED",
              "name": 955664,
              "cin": "U65910GJ1986PLC106745"
          },
          {
              "_id": 13691450,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1814036
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13707702,
              "_type": "Subsidiary",
              "_startId": 1814036,
              "_endId": 1478544
          },
          {
              "_id": 1814036,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIAL INVESTMENTS AND HOLDINGS LIMITED",
              "name": 955664,
              "cin": "U65910GJ1986PLC106745"
          },
          {
              "_id": 13705352,
              "_type": "Subsidiary",
              "_startId": 1758508,
              "_endId": 1814036
          },
          {
              "_id": 1758508,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE COMMERCIAL DEALERS LIMITED",
              "name": 926476,
              "cin": "U51909MH2006PLC166162"
          },
          {
              "_id": 9807027,
              "_type": "Director",
              "_startId": 1758508,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13707702,
              "_type": "Subsidiary",
              "_startId": 1814036,
              "_endId": 1478544
          },
          {
              "_id": 1814036,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIAL INVESTMENTS AND HOLDINGS LIMITED",
              "name": 955664,
              "cin": "U65910GJ1986PLC106745"
          },
          {
              "_id": 13710090,
              "_type": "Subsidiary",
              "_startId": 1851673,
              "_endId": 1814036
          },
          {
              "_id": 1851673,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE PETROINVESTMENTS LIMITED",
              "name": 975789,
              "cin": "U72900MH1999PLC121039"
          },
          {
              "_id": 9994418,
              "_type": "Director",
              "_startId": 1851673,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13708134,
              "_type": "Subsidiary",
              "_startId": 1820741,
              "_endId": 1478544
          },
          {
              "_id": 1820741,
              "_labels": [
                  "Company"
              ],
              "companyName": "SURELA INVESTMENT AND TRADING LIMITED",
              "name": 959246,
              "cin": "U65990MH1986PLC041221"
          },
          {
              "_id": 13691457,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1820741
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13708427,
              "_type": "Subsidiary",
              "_startId": 1824854,
              "_endId": 1478544
          },
          {
              "_id": 1824854,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE STRATEGIC INVESTMENTS LIMITED",
              "name": 961490,
              "cin": "U65990MH1999PLC120918"
          },
          {
              "_id": 13691488,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1824854
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13708427,
              "_type": "Subsidiary",
              "_startId": 1824854,
              "_endId": 1478544
          },
          {
              "_id": 1824854,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE STRATEGIC INVESTMENTS LIMITED",
              "name": 961490,
              "cin": "U65990MH1999PLC120918"
          },
          {
              "_id": 13705356,
              "_type": "Associate",
              "_startId": 1758508,
              "_endId": 1824854
          },
          {
              "_id": 1758508,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE COMMERCIAL DEALERS LIMITED",
              "name": 926476,
              "cin": "U51909MH2006PLC166162"
          },
          {
              "_id": 9807027,
              "_type": "Director",
              "_startId": 1758508,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13708427,
              "_type": "Subsidiary",
              "_startId": 1824854,
              "_endId": 1478544
          },
          {
              "_id": 1824854,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE STRATEGIC INVESTMENTS LIMITED",
              "name": 961490,
              "cin": "U65990MH1999PLC120918"
          },
          {
              "_id": 13708428,
              "_type": "Holding",
              "_startId": 1824854,
              "_endId": 1851673
          },
          {
              "_id": 1851673,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE PETROINVESTMENTS LIMITED",
              "name": 975789,
              "cin": "U72900MH1999PLC121039"
          },
          {
              "_id": 9994418,
              "_type": "Director",
              "_startId": 1851673,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13708427,
              "_type": "Subsidiary",
              "_startId": 1824854,
              "_endId": 1478544
          },
          {
              "_id": 1824854,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE STRATEGIC INVESTMENTS LIMITED",
              "name": 961490,
              "cin": "U65990MH1999PLC120918"
          },
          {
              "_id": 13710092,
              "_type": "Subsidiary",
              "_startId": 1851673,
              "_endId": 1824854
          },
          {
              "_id": 1851673,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE PETROINVESTMENTS LIMITED",
              "name": 975789,
              "cin": "U72900MH1999PLC121039"
          },
          {
              "_id": 9994418,
              "_type": "Director",
              "_startId": 1851673,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13709109,
              "_type": "Subsidiary",
              "_startId": 1837112,
              "_endId": 1478544
          },
          {
              "_id": 1837112,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE JIO INFOCOMM LIMITED",
              "name": 967864,
              "cin": "U72900GJ2007PLC105869"
          },
          {
              "_id": 13691433,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1837112
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13710082,
              "_type": "Subsidiary",
              "_startId": 1851578,
              "_endId": 1478544
          },
          {
              "_id": 1851578,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE RETAIL INSURANCE BROKING LIMITED",
              "name": 975740,
              "cin": "U67200MH2006PLC165651"
          },
          {
              "_id": 13691458,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1851578
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13710091,
              "_type": "Subsidiary",
              "_startId": 1851673,
              "_endId": 1478544
          },
          {
              "_id": 1851673,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE PETROINVESTMENTS LIMITED",
              "name": 975789,
              "cin": "U72900MH1999PLC121039"
          },
          {
              "_id": 13705355,
              "_type": "Associate",
              "_startId": 1758508,
              "_endId": 1851673
          },
          {
              "_id": 1758508,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE COMMERCIAL DEALERS LIMITED",
              "name": 926476,
              "cin": "U51909MH2006PLC166162"
          },
          {
              "_id": 9807027,
              "_type": "Director",
              "_startId": 1758508,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13711999,
              "_type": "Subsidiary",
              "_startId": 1936126,
              "_endId": 1478544
          },
          {
              "_id": 1936126,
              "_labels": [
                  "Company"
              ],
              "companyName": "DADHA PHARMA DISTRIBUTION LIMITED",
              "name": 1030500,
              "cin": "U74900TN2015PLC102202"
          },
          {
              "_id": 13691476,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 1936126
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13713725,
              "_type": "Subsidiary",
              "_startId": 2199548,
              "_endId": 1478544
          },
          {
              "_id": 2199548,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE BP MOBILITY LIMITED",
              "name": 1186202,
              "cin": "U50100MH2015PLC327401"
          },
          {
              "_id": 13691461,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 2199548
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13715732,
              "_type": "Subsidiary",
              "_startId": 2890304,
              "_endId": 1478544
          },
          {
              "_id": 2890304,
              "_labels": [
                  "Company"
              ],
              "companyName": "GENESIS COLORS LIMITED",
              "name": 1550547,
              "cin": "U51311MH1998PLC335921"
          },
          {
              "_id": 13691437,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 2890304
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13717364,
              "_type": "Subsidiary",
              "_startId": 3111939,
              "_endId": 1478544
          },
          {
              "_id": 3111939,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE SERVICES AND HOLDINGS LIMITED",
              "name": 1673537,
              "cin": "U74110GJ2016PLC093588"
          },
          {
              "_id": 13717365,
              "_type": "Associate",
              "_startId": 3111939,
              "_endId": 3721162
          },
          {
              "_id": 3721162,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE BP MOBILITY LIMITED",
              "name": 2118072,
              "cin": "U50100MH2015PLC327401"
          },
          {
              "_id": 11824949,
              "_type": "Director",
              "_startId": 3721162,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13717801,
              "_type": "Subsidiary",
              "_startId": 3150435,
              "_endId": 1478544
          },
          {
              "_id": 3150435,
              "_labels": [
                  "Company"
              ],
              "companyName": "JIO PAYMENTS BANK LIMITED",
              "name": 1694718,
              "cin": "U65999MH2016PLC287584"
          },
          {
              "_id": 13691474,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 3150435
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13718530,
              "_type": "Subsidiary",
              "_startId": 3219485,
              "_endId": 1478544
          },
          {
              "_id": 3219485,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE GAS LIFESTYLE INDIA PRIVATE LIMITED",
              "name": 1734596,
              "cin": "U52609MH2017PTC291039"
          },
          {
              "_id": 13691449,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 3219485
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13719979,
              "_type": "Subsidiary",
              "_startId": 3429027,
              "_endId": 1478544
          },
          {
              "_id": 3429027,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE CONTENT DISTRIBUTION LIMITED",
              "name": 1893185,
              "cin": "U74999MH2017PLC299342"
          },
          {
              "_id": 13691459,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 3429027
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13723609,
              "_type": "Subsidiary",
              "_startId": 3500581,
              "_endId": 1478544
          },
          {
              "_id": 3500581,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE PROLIFIC TRADERS PRIVATE LIMITED",
              "name": 1931222,
              "cin": "U51100MH2005PTC302788"
          },
          {
              "_id": 13691493,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 3500581
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13723612,
              "_type": "Subsidiary",
              "_startId": 3500582,
              "_endId": 1478544
          },
          {
              "_id": 3500582,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE PROGRESSIVE TRADERS PRIVATE LIMITED",
              "name": 1931223,
              "cin": "U51100MH2005PTC302792"
          },
          {
              "_id": 13691489,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 3500582
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13723615,
              "_type": "Subsidiary",
              "_startId": 3500583,
              "_endId": 1478544
          },
          {
              "_id": 3500583,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE UNIVERSAL TRADERS PRIVATE LIMITED",
              "name": 1931224,
              "cin": "U51100MH2005PTC302789"
          },
          {
              "_id": 13691494,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 3500583
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13723978,
              "_type": "Subsidiary",
              "_startId": 3554129,
              "_endId": 1478544
          },
          {
              "_id": 3554129,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE JIO MESSAGING SERVICES LIMITED",
              "name": 1960597,
              "cin": "U32204GJ2013PLC107561"
          },
          {
              "_id": 13691491,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 3554129
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13725240,
              "_type": "Subsidiary",
              "_startId": 3721162,
              "_endId": 1478544
          },
          {
              "_id": 3721162,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE BP MOBILITY LIMITED",
              "name": 2118072,
              "cin": "U50100MH2015PLC327401"
          },
          {
              "_id": 13691464,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 3721162
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13726477,
              "_type": "Subsidiary",
              "_startId": 3906057,
              "_endId": 1478544
          },
          {
              "_id": 3906057,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE 4IR REALTY DEVELOPMENT LIMITED",
              "name": 2214538,
              "cin": "U70109GJ2019PLC107623"
          },
          {
              "_id": 13691439,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 3906057
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13726916,
              "_type": "Subsidiary",
              "_startId": 4088393,
              "_endId": 1478544
          },
          {
              "_id": 4088393,
              "_labels": [
                  "Company"
              ],
              "companyName": "JIO PLATFORMS LIMITED",
              "name": 2310836,
              "cin": "U72900GJ2019PLC110816"
          },
          {
              "_id": 13691435,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 4088393
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13726922,
              "_type": "Subsidiary",
              "_startId": 4088395,
              "_endId": 1478544
          },
          {
              "_id": 4088395,
              "_labels": [
                  "Company"
              ],
              "companyName": "JIO LIMITED",
              "name": 2310837,
              "cin": "U72900GJ2019PLC110820"
          },
          {
              "_id": 13691441,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 4088395
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 13644053,
              "_type": "Subsidiary",
              "_startId": 129743,
              "_endId": 1478544
          },
          {
              "_id": 129743,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE VANTAGE RETAIL LIMITED",
              "name": 65994,
              "cin": "U51109MH2007PLC307506"
          },
          {
              "_id": 13691487,
              "_type": "Holding",
              "_startId": 1478544,
              "_endId": 129743
          },
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267702,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267724,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5214406
          },
          {
              "_id": 5214406,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MUKESH DHIRUBHAI AMBANI",
              "din": "1695",
              "name": 682,
              "pan": "AADPA3705F"
          },
          {
              "_id": 10300903,
              "_type": "Director",
              "_startId": 2053005,
              "_endId": 5214406
          },
          {
              "_id": 2053005,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE PETROLEUM LIMITED",
              "name": 1100125,
              "cin": "L11100GJ2005PLC048030"
          },
          {
              "_id": 10300906,
              "_type": "Director",
              "_startId": 2053005,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267720,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5214325
          },
          {
              "_id": 5214325,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MAHESH PRASAD MODI",
              "din": "1604",
              "name": 584,
              "pan": "AAFPM8989F"
          },
          {
              "_id": 10300901,
              "_type": "Director",
              "_startId": 2053005,
              "_endId": 5214325
          },
          {
              "_id": 2053005,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE PETROLEUM LIMITED",
              "name": 1100125,
              "cin": "L11100GJ2005PLC048030"
          },
          {
              "_id": 10300906,
              "_type": "Director",
              "_startId": 2053005,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267716,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5792603
          },
          {
              "_id": 5792603,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "ADIL ZAINULBHAI",
              "name": 324824,
              "din": "6646490",
              "pan": "AAFPZ3485K"
          },
          {
              "_id": 8480172,
              "_type": "Director",
              "_startId": 1112688,
              "_endId": 5792603
          },
          {
              "_id": 1112688,
              "_labels": [
                  "Company"
              ],
              "companyName": "NETWORK18 MEDIA u0026 INVESTMENTS LIMITED",
              "name": 589011,
              "cin": "L65910MH1996PLC280969"
          },
          {
              "_id": 8480163,
              "_type": "Director",
              "_startId": 1112688,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267716,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5792603
          },
          {
              "_id": 5792603,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "ADIL ZAINULBHAI",
              "name": 324824,
              "din": "6646490",
              "pan": "AAFPZ3485K"
          },
          {
              "_id": 8483205,
              "_type": "Director",
              "_startId": 1113491,
              "_endId": 5792603
          },
          {
              "_id": 1113491,
              "_labels": [
                  "Company"
              ],
              "companyName": "TV18 BROADCAST LIMITED",
              "name": 589403,
              "cin": "L74300MH2005PLC281753"
          },
          {
              "_id": 8483197,
              "_type": "Director",
              "_startId": 1113491,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267716,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5792603
          },
          {
              "_id": 5792603,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "ADIL ZAINULBHAI",
              "name": 324824,
              "din": "6646490",
              "pan": "AAFPZ3485K"
          },
          {
              "_id": 9419066,
              "_type": "Director",
              "_startId": 1562643,
              "_endId": 5792603
          },
          {
              "_id": 1562643,
              "_labels": [
                  "Company"
              ],
              "companyName": "VIACOM 18 MEDIA PRIVATE LIMITED",
              "name": 824553,
              "cin": "U92100MH1995PTC095508"
          },
          {
              "_id": 9419054,
              "_type": "Director",
              "_startId": 1562643,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267713,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 6266248
          },
          {
              "_id": 6266248,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "PAWAN KUMAR KAPIL",
              "name": 601012,
              "din": "2460200",
              "pan": "AGIPK7466Q"
          },
          {
              "_id": 10300900,
              "_type": "Director",
              "_startId": 2053005,
              "_endId": 6266248
          },
          {
              "_id": 2053005,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE PETROLEUM LIMITED",
              "name": 1100125,
              "cin": "L11100GJ2005PLC048030"
          },
          {
              "_id": 10300906,
              "_type": "Director",
              "_startId": 2053005,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267709,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5781607
          },
          {
              "_id": 5781607,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "RAGHUNATH ANANT MASHELKAR",
              "din": "74119",
              "name": 318534,
              "pan": "ABBPM4169N"
          },
          {
              "_id": 12256845,
              "_type": "Director",
              "_startId": 4046105,
              "_endId": 5781607
          },
          {
              "_id": 4046105,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE O2C LIMITED",
              "name": 2288293,
              "cin": "U11100GJ2019PLC113609"
          },
          {
              "_id": 12256838,
              "_type": "Director",
              "_startId": 4046105,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267705,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 6266250
          },
          {
              "_id": 6266250,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "RAMINDER SINGH GUJRAL",
              "name": 601013,
              "din": "7175393",
              "pan": "AEHPG1535P"
          },
          {
              "_id": 12256841,
              "_type": "Director",
              "_startId": 4046105,
              "_endId": 6266250
          },
          {
              "_id": 4046105,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE O2C LIMITED",
              "name": 2288293,
              "cin": "U11100GJ2019PLC113609"
          },
          {
              "_id": 12256838,
              "_type": "Director",
              "_startId": 4046105,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267704,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5214384
          },
          {
              "_id": 5214384,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "HITAL RASIKLAL MESWANI",
              "din": "1623",
              "name": 661,
              "pan": "AAGPM7882G"
          },
          {
              "_id": 9807029,
              "_type": "Director",
              "_startId": 1758508,
              "_endId": 5214384
          },
          {
              "_id": 1758508,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE COMMERCIAL DEALERS LIMITED",
              "name": 926476,
              "cin": "U51909MH2006PLC166162"
          },
          {
              "_id": 9807027,
              "_type": "Director",
              "_startId": 1758508,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267704,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5214384
          },
          {
              "_id": 5214384,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "HITAL RASIKLAL MESWANI",
              "din": "1623",
              "name": 661,
              "pan": "AAGPM7882G"
          },
          {
              "_id": 10300902,
              "_type": "Director",
              "_startId": 2053005,
              "_endId": 5214384
          },
          {
              "_id": 2053005,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE PETROLEUM LIMITED",
              "name": 1100125,
              "cin": "L11100GJ2005PLC048030"
          },
          {
              "_id": 10300906,
              "_type": "Director",
              "_startId": 2053005,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267704,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5214384
          },
          {
              "_id": 5214384,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "HITAL RASIKLAL MESWANI",
              "din": "1623",
              "name": 661,
              "pan": "AAGPM7882G"
          },
          {
              "_id": 11824950,
              "_type": "Director",
              "_startId": 3721162,
              "_endId": 5214384
          },
          {
              "_id": 3721162,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE BP MOBILITY LIMITED",
              "name": 2118072,
              "cin": "U50100MH2015PLC327401"
          },
          {
              "_id": 11824949,
              "_type": "Director",
              "_startId": 3721162,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267704,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5214384
          },
          {
              "_id": 5214384,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "HITAL RASIKLAL MESWANI",
              "din": "1623",
              "name": 661,
              "pan": "AAGPM7882G"
          },
          {
              "_id": 12256840,
              "_type": "Director",
              "_startId": 4046105,
              "_endId": 5214384
          },
          {
              "_id": 4046105,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE O2C LIMITED",
              "name": 2288293,
              "cin": "U11100GJ2019PLC113609"
          },
          {
              "_id": 12256838,
              "_type": "Director",
              "_startId": 4046105,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267703,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5214314
          },
          {
              "_id": 5214314,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "NIKHIL RASIKLAL MESWANI",
              "din": "1620",
              "name": 568,
              "pan": "AAGPM7881F"
          },
          {
              "_id": 9807028,
              "_type": "Director",
              "_startId": 1758508,
              "_endId": 5214314
          },
          {
              "_id": 1758508,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE COMMERCIAL DEALERS LIMITED",
              "name": 926476,
              "cin": "U51909MH2006PLC166162"
          },
          {
              "_id": 9807027,
              "_type": "Director",
              "_startId": 1758508,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267703,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5214314
          },
          {
              "_id": 5214314,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "NIKHIL RASIKLAL MESWANI",
              "din": "1620",
              "name": 568,
              "pan": "AAGPM7881F"
          },
          {
              "_id": 12256839,
              "_type": "Director",
              "_startId": 4046105,
              "_endId": 5214314
          },
          {
              "_id": 4046105,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE O2C LIMITED",
              "name": 2288293,
              "cin": "U11100GJ2019PLC113609"
          },
          {
              "_id": 12256838,
              "_type": "Director",
              "_startId": 4046105,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  },
  {
      "p": [
          {
              "_id": 1478544,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE INDUSTRIES LIMITED",
              "name": 781816,
              "cin": "L17110MH1973PLC019786"
          },
          {
              "_id": 9267701,
              "_type": "Director",
              "_startId": 1478544,
              "_endId": 5211752
          },
          {
              "_id": 5211752,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "YOGENDRA PREMKRISHNA TRIVEDI",
              "din": "1879",
              "name": 882,
              "pan": "AAFPT3468G"
          },
          {
              "_id": 10300904,
              "_type": "Director",
              "_startId": 2053005,
              "_endId": 5211752
          },
          {
              "_id": 2053005,
              "_labels": [
                  "Company"
              ],
              "companyName": "RELIANCE PETROLEUM LIMITED",
              "name": 1100125,
              "cin": "L11100GJ2005PLC048030"
          },
          {
              "_id": 10300906,
              "_type": "Director",
              "_startId": 2053005,
              "_endId": 5227850
          },
          {
              "_id": 5227850,
              "_labels": [
                  "Person"
              ],
              "directorType": "Director",
              "directorName": "MADHUSUDANA SIVAPRASAD PANDA",
              "din": "12144",
              "name": 11007,
              "pan": "AAJPP8964D"
          }
      ]
  }
]