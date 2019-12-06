# hgop-verklegt


Jenkins: http://34.203.197.46:8080

Comments: 
-Eigum eftir að búa til og submitta jenkinsPassword í comment á Canvas assignment
-Jenkins skilaði alltaf villu þegar hann reyndi að nota `initialize_game_api_instance.sh` skriptuna til þess að setja upp Docker í game_api instance-inu okkar. (Sjá til dæmis build 134, línurnar `unable to locate package docker-ce-cli`). Okkur tókst að komast hjá þessu með því að keyra eftirfarandi línur tvisvar:

```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository \
    "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) \
    stable"
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io
```

Þar sem við keyrum þetta tvisvar fáum við ennþá sömu villu í öllum nýjum buildum þegar línurnar fyrir ofan eru keyrðar en svo installast þetta þegar þetta er keyrt í annað skiptið.