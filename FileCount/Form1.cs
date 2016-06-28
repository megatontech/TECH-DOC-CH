using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Windows.Forms;

namespace FileCount
{
    public partial class Form1 : Form
    {
        private string FolderLocation = "";
        private Dictionary<string, int> CountResule = new Dictionary<string, int>();
        private Dictionary<string, long> SizeResule = new Dictionary<string, long>();
        private string Startpath = "";

        public Form1()
        {
            InitializeComponent();
            Startpath = System.Environment.CurrentDirectory;
        }

        private void Form1_Load(object sender, EventArgs e)
        {
        }

        private void button1_Click(object sender, EventArgs e)
        {
            CountResule = new Dictionary<string, int>();
            if (folderBrowserDialog1.ShowDialog() == DialogResult.OK)
            {
                FolderLocation = folderBrowserDialog1.SelectedPath;
                button2.Enabled = true;
                button3.Enabled = true;
            }
        }

        private void button2_Click(object sender, EventArgs e)
        {
            button2.Enabled = false;
            CountResule = new Dictionary<string, int>();
            string fileName = Startpath + "\\" + DateTime.Now.Ticks + "count.txt";
            DirectoryInfo info = new DirectoryInfo(FolderLocation);
            GetFileNamesByfolder(info);
            CountResule = CountResule.OrderByDescending(x => x.Value).ToDictionary(x => x.Key, y => y.Value);
            Dictionary<string, int>.KeyCollection key = CountResule.Keys;
            foreach (string s in key)
            {
                int tempCount = 0;
                CountResule.TryGetValue(s, out tempCount);
                string tempText = "file type:" + s + " count: " + tempCount + "\n\r";
                TxtExport(fileName, tempText);
            }
            button2.Enabled = true;
        }

        private void button3_Click(object sender, EventArgs e)
        {
            button3.Enabled = false;
            SizeResule = new Dictionary<string, long>();
            string fileName = Startpath + "\\" + DateTime.Now.Ticks + "size.txt";
            DirectoryInfo info = new DirectoryInfo(FolderLocation);
            GetFileSizeByfolder(info);
            SizeResule = SizeResule.OrderByDescending(x => x.Value).ToDictionary(x => x.Key, y => y.Value);
            Dictionary<string, long>.KeyCollection key = SizeResule.Keys;
            foreach (string s in key)
            {
                long tempCount = 0;
                SizeResule.TryGetValue(s, out tempCount);
                string tempText = "file: " + s + " size: " + tempCount + "\n\r";
                TxtExport(fileName, tempText);
            }
            button3.Enabled = true;
        }

        private bool TxtExport(string FullFileName, string TextAll)
        {
            if (!CreatFile(FullFileName))
            {
                return false;
            }
            StreamWriter sw = File.AppendText(FullFileName);
            sw.WriteLine(TextAll);
            sw.Close();
            return true;
        }

        private bool CreatFile(string FullFileName)
        {
            if (File.Exists(FullFileName))
            {
                return true;
            }
            else
            {
                try
                {
                    FileStream fs = new FileStream(FullFileName, FileMode.CreateNew);
                    fs.Close();
                    return true;
                }
                catch (Exception e)
                {
                    MessageBox.Show(e.Message.ToString());
                    return false;
                }
            }
        }

        private void GetFileNamesByfolder(DirectoryInfo info)
        {
            FileInfo[] allFile = info.GetFiles();
            foreach (FileInfo fi in allFile)
            {
                int currentCount = 0;
                if (CountResule.TryGetValue(fi.Extension, out currentCount))
                {
                    CountResule.Remove(fi.Extension);
                    int temp = currentCount + 1;
                    CountResule.Add(fi.Extension, temp);
                }
                else
                {
                    CountResule.Add(fi.Extension, 1);
                }
            }
            DirectoryInfo[] allDir = info.GetDirectories();
            foreach (DirectoryInfo di in allDir)
            {
                GetFileNamesByfolder(di);
            }
        }

        private void GetFileSizeByfolder(DirectoryInfo info)
        {
            FileInfo[] allFile = info.GetFiles();
            foreach (FileInfo fi in allFile)
            {
                SizeResule.Add(fi.FullName, fi.Length);
            }
            DirectoryInfo[] allDir = info.GetDirectories();
            foreach (DirectoryInfo di in allDir)
            {
                GetFileSizeByfolder(di);
            }
        }
    }
}