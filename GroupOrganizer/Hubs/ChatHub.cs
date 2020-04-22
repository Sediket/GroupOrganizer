using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
//using System.Text.Json;
//using System.Text.Json.Serialization;
using Newtonsoft.Json;


namespace GroupOrganizer.Hubs
{
    public class ChatHub : Hub
    {
        static Dictionary<string, string> usersD = new Dictionary<string, string>();
        public async Task SendMessage(string user, string currentGroup, string message)
        {
            
            //client sends currentLoggedInUser and the group selected
            //recevie username and the current selected group the user is looking at
            //add the username and group to context.items
            //send all users and the group they are looking at to all clients
            //client recevices the list of users and groups
            //client matches the currentloggedInUser to what was recevieced
            //client sets the groups.selected datastructure and UI to what the user's current group is
            string tempCurrentGroup;
            //check to see if the user exists in context.items
            if (usersD.TryGetValue(user, out tempCurrentGroup))
            {
                //username exists, check to see if the users group is what we have in context.items
                if (tempCurrentGroup.ToString() == currentGroup)
                {
                    //group is up-to-date
                } else
                {
                    //gropu is not up-to-date, update
                    usersD.Remove(user);
                    usersD.Add(user, currentGroup);
                }

            } else
            {
                //userdoesn't exists, add
                usersD.Add(user, currentGroup);
            }
            //json the dictionary
            string jsonUsers = JsonConvert.SerializeObject(usersD);
            //send username and message to all connected clients.
            await Clients.All.SendAsync("ReceiveMessage", jsonUsers, message);
        

        //string tempUser;
        //    object value;
        //    //check if key "userName" exists in context.items dictionary
        //    if (Context.Items.TryGetValue("userName", out value))
        //    {
        //        //username exists, check to see the username recived matches whats in the dictionary
        //        tempUser = value.ToString();
        //        if (tempUser == user)
        //        {
        //            user = tempUser;
        //        }
        //        else
        //        {
        //            //username didn't match, remove and add in new username
        //            Context.Items.Remove("userName");
        //            Context.Items.Add("userName", user);
        //        }
        //    }
        //    else
        //    {
        //        //no value for "userName" existed in the dictionary, add in the username that was recived
        //        Context.Items.Add("userName", user);
        //    }


        //    //send username and message to all connected clients.
        //    await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public async Task ReceiveGroup(string group) {
            await Clients.All.SendAsync("ReceiveGroup", group);
        }
    }
}
