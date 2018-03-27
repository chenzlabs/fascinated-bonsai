  function showScriptFromStory(tourTitle, visited) {
    if (tourTitle == '73') { // at the doors outside
      if (!visited[tourTitle]) {
        return `I can't wait to see the Kimmel Center!
(Select numbered points to navigate, or use arrow keys to face one and press ENTER or UP.)
<<EOF`
      } else
      if (!visited['72']) { // outside by the street       
        return `I hope my ticket is out there...
<<EOF`
      } else {
        return `I walk inside to explore the Kimmel Center.
<<EOF`
      }
    }

    if (tourTitle == '72') { // outside by the street
      if (!visited[tourTitle]) {        
        return `There it is! I grab my ticket and put it in my pocket.
Let's head back in.
<<EOF`
      }
    }
        
    if (tourTitle == '43') { // in the entryway
      if (!visited['72']) { // outside by the street       
        return `Uh oh, did I drop my ticket outside?  I better go check.
<<EOF`
      } else {
        return `Beautiful.  But how do I get on stage at Verizon Hall?
<<EOF`     
      }
    }

    if (tourTitle == '74') { // Commonwealth Plaza
      if (!visited[tourTitle]) {        
        return `Up ahead I see Verizon Hall near the stairs.
<<EOF`
      }
    }
    
    if (tourTitle == '68' || tourTitle == '75') {
      if (!visited['68'] && !visited['75']) {        
        return `Verizon Hall looks closed, but maybe they will let me go in.
<<EOF`
      }
    }
        
    if (tourTitle == '66' || tourTitle == '3') {
      if (!visited['66'] && !visited['3']) {        
        return `I thank the staff for letting me look inside Verizon Hall.
<<EOF`
      }
    }

    if (tourTitle == '51' || tourTitle == '47') {
      if (!visited['51'] && !visited['47']) {        
        return `I always dreamed of being on the Kimmel stage.
<<EOF`
      }
    }

    if (tourTitle == '59') {
      if (!visited[tourTitle]) {        
        return `I bet my parents dreamed of watching me here too. 
<<EOF`
      }
    }

    if (tourTitle == '58' || tourTitle == '60') {
      if (visited['59']) {        
        return `Cool.  But how do I see from those seats up under the organ pipes?
Maybe I need to check upstairs...
<<EOF`
      }
    }
                    
    if (tourTitle == '82' || tourTitle == '89') {
      if (!visited['82'] && !visited['89']) {        
        return `Cozy!  This side door is closed though. 
<<EOF`
      }
    }
            
    if (tourTitle == '85' || tourTitle == '86') {
      if (!visited['85'] && !visited['86']) {        
        return `This must be where you walk out. 
<<EOF`
      } else 
      if (visited['163']) {        
        return `That was great.  Let's go out the other side.
<<EOF`
      }
    }
            
    if (tourTitle == '141' || tourTitle == '161') {
      if (!visited['141'] && !visited['161']) {        
        return `Let's look across the audience from dead center. 
<<EOF`
      }
    }

    if (tourTitle == '163') {
      if (!visited[tourTitle]) {        
        return `That's a pretty cool view of both the stage and the audience!
<<EOF`
      }
    }
            
    return '';
  }
  