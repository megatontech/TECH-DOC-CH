using System;
using System.Collections.Generic;
using System.Text;

namespace SP_Gen.Classes
{
    class Session
    {
        public static void SaveInSession(string Name,object Value)
        {
            // appdomain setup information
            AppDomain currentDomain = AppDomain.CurrentDomain;

            //Create a new value pair for the appdomain
            currentDomain.SetData(Name, Value);
        }

        public static object LoadFromSession(string Name)
        {
            // appdomain setup information
            AppDomain currentDomain = AppDomain.CurrentDomain;
            return currentDomain.GetData(Name);
        }
    }
}
