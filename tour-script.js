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
        return `Whew! I put my ticket in my pocket.
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
      } else {
        return `Cool.  But how do I watch from those seats up there?
Maybe I need to check upstairs...
<<EOF`
      }
    }
            
    if (tourTitle == '59') {
      if (!visited[tourTitle]) {        
        return `I bet my parents dreamed of watching me here too. 
<<EOF`
      }
    }
            
    if (tourTitle == '82') {
      if (!visited[tourTitle]) {        
        return `Cozy!  This side door is closed though. 
<<EOF`
      }
    }
            
    if (tourTitle == '85') {
      if (!visited[tourTitle]) {        
        return `This must be where you walk out. 
<<EOF`
      }
    }
            
    if (tourTitle == '141') {
      if (!visited[tourTitle]) {        
        return `Let's look across the audience from dead center. 
<<EOF`
      }
    }
            
    if (tourTitle == '86') {
      if (!visited[tourTitle]) {        
        return `That was great.  Let's go out the other side.
<<EOF`
      }
    }
            
    return '';
  }
  