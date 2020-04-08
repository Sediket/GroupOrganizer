using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;


namespace GroupOrganizer.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            string tempUser;
            object value;
            //check if key "userName" exists in context.items dictionary
            if (Context.Items.TryGetValue("userName", out value))
            {
                //username exists, check to see the username recived matches whats in the dictionary
                tempUser = value.ToString();
                if (tempUser == user)
                {
                    user = tempUser;

                }
                else
                {
                    //username didn't match, remove and add in new username
                    Context.Items.Remove("userName");
                    Context.Items.Add("userName", user);
                }
            }
            else
            {
                //no value for "userName" existed in the dictionary, add in the username that was recived
                Context.Items.Add("userName", user);
            }


            //send username and message to all connected clients.
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}
