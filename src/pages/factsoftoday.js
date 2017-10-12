import React, { Component } from "react";
import ProjectPage from "../components/ProjectPage/index";
import ProjectSection from "../components/ProjectSection/index";
import SyntaxHighlighter from "react-syntax-highlighter";
import { obsidian } from "react-syntax-highlighter/dist/styles";
import PortfolioDelegate from "../utils/PortfolioDelegate";
import SEO from "../components/SEO";

class FactsOfToday extends Component {
  constructor(props) {
    super(props);

    const delegate = new PortfolioDelegate();

    let index = delegate.getProjectIndex("Facts of Today");

    this.state = {
      project: delegate.projects[index]
    };
  }
  render() {
    let style = {
      title: {
        color: this.state.project.color,
        fontWeight: "bold"
      }
    };
    return (
      <ProjectPage
        name={this.state.project.name}
        title={this.state.project.name}
        color={this.state.project.color}
        technologies={this.state.project.technologies}
        description={this.state.project.description}
        github={this.state.project.github_url}
        liveUrl={this.state.project.live_url}
        bgColor={this.state.project.background_color}
        images={this.state.project.image_urls.screenshots}
        bigPicture={this.state.project.big_picture}
      >
        <SEO
          title={`${this.state.project.name} | Malik Browne`}
          description={this.state.project.description}
          image={this.state.project.image_urls.screenshots[0]}
          url={`https://www.malikbrowne.com/${this.state.project.path.substr(1)}`}
        />
        <div className="container">
          <img
            src={this.state.project.image_urls.screenshots[0]}
            alt="Facts of Today"
            className="pic"
          />
        </div>
        <ProjectSection title="Background">
          <p>
            I'm a <b>big fan</b> of random facts. A couple of classmates wanted
            to make an app that we could eventually publish to the app store.
          </p>

          <p>
            We looked for ideas that we couldn't find a solid application for,
            as we wanted to fill a need that didn't quite exist yet.
          </p>

          <p>
            After gathering a list of a few ideas and a long brainstorming
            session, we decided on{" "}
            <span style={style.title}>Facts of Today</span>, an app where you
            could see the different events that happened every day in history.
          </p>
        </ProjectSection>
        <ProjectSection title="Requirements">
          <p>
            We wanted a chance to practice{" "}
            <a href="http://www.agilenutshell.com/">agile methodologies</a>, and
            produce an app the same way a professional mobile app developer
            would approach it. To reproduce this, we would need to do the
            following things:
          </p>

          <ol>
            <li>Create a wireframe for our application</li>
            <li>
              Lay out user stories for a basic MVP (minimum viable product)
            </li>
            <li>Separate our work for each person by issues on Github</li>
            <li>
              Define a game plan for core app flows, potential stakeholders, and
              a basic pitch
            </li>
            <li>Define our data schemas used for the app</li>
            <li>
              Work on each part of the project in sprints of about 3 weeks.
            </li>
          </ol>

          <p>
            The app was going to be primarily built in Swift, as it was a
            language we had recently learned.
          </p>
        </ProjectSection>
        <ProjectSection title="Implementation">
          <h6>Defining our user stories</h6>
          <p>
            The first thing our team did was define our required user stories
            for <span style={style.title}>Facts of Today</span>. For the minimum
            viable product, our basic user stories were:
          </p>

          <ul>
            <li>
              As a user, I would like the app to open and search for today’s
              date by default.
            </li>
            <li>
              As a user, I would like to see preview of the three categories on
              the main screen: events, births, deaths.
            </li>
            <li>
              As a user, I would like to tap the preview to go to a table view
              that lists more items in that category for that day.
            </li>
            <li>
              As a user, I would like to tap the links available in each cell to
              open a web view of the related Wikipedia page.
            </li>
            <li>
              As a user, I would like to swipe left and right on the main page
              to switch to adjacent dates.
            </li>
            <li>
              As a user, I would like to open a calendar view to pick from
              further dates more quickly.
            </li>
            <li>
              As a user, I would like to tap the ‘today’ button to get back to
              the current day.
            </li>
          </ul>

          <p>
            These are the points that we needed to make sure we got done at the
            end of each sprint. We also included some optional items to do such
            as:
          </p>

          <ul>
            <li>The ability to change the color scheme of the app</li>
            <li>Setting and receiving daily event notifications</li>
            <li>If looking at a location, pull up a map of the area</li>
            <li>Sharing information and links via Twitter</li>
          </ul>

          <h6>Creating a wireframe</h6>

          <p>
            With all of these awesome ideas, we created a wireframe to represent
            how all of this data would interact on a basic level. The wireframe
            includes each part of the app:
          </p>

          <ol>
            <li>Screen for Events, Births, and Deaths</li>
            <li>Detailed screen for each category</li>
            <li>A calendar to choose a specific day</li>
            <li>Links to specific Wikipedia articles</li>
            <li>Settings screen</li>
          </ol>

          <p>
            Here's the final result of the wireframe, with arrows to show how a
            user could navigate:
          </p>
          <img
            src={this.state.project.image_urls.screenshots[3]}
            alt="Wireframe"
            className="pic"
          />

          <h6>Defining our data scheme (resources)</h6>

          <p>
            We needed to figure out how we could get this information. Our first
            thought was to use an encyclopedia website API, as that would
            contain the most accurate information we could find. Unfortunately
            we couldn't find anything like that.
          </p>

          <p>
            However, we had a backup:{" "}
            <a href="http://history.muffinlabs.com/">
              The Today In History API
            </a>. Using this API as well as using parts of Wikipedia API to get
            thumbnails, we established a History Model that for a single event
            would contain:
          </p>

          <ol>
            <li>The event's information</li>
            <li>Year of the Event</li>
            <li>A list of related links to the event</li>
            <li>A thumbnail image to represent the event.</li>
          </ol>

          <p>
            This model had two functions: getEventsByDate, and a cache function
            to persist data across app refreshes. The important function was
            getEventsbyDate:
          </p>

          <SyntaxHighlighter language="swift" showLineNumbers style={obsidian}>
            {`// HistoryClient.swift

class func getEventsByDate(month: String, day: String, completion: (events: [Event]?, births: [Event]?, deaths: [Event]?) -> ()) {
let url = NSURL(string: "http://history.muffinlabs.com/date/\\(month)/\\(day)")
let request = NSURLRequest(URL: url!)
let session = NSURLSession(
  configuration: NSURLSessionConfiguration.defaultSessionConfiguration(),
  delegate: nil,
  delegateQueue:  NSOperationQueue.mainQueue()
)

let task : NSURLSessionDataTask = session.dataTaskWithRequest(request,
  completionHandler: { (dataOrNil, response, error) in
    if error != nil {
      print("retrieving information for date:\\n\\(error?.localizedDescription)")
      completion(events: nil, births: nil, deaths: nil)
      return
    }
    
    if let data = dataOrNil {
      if let responseDictionary = try! NSJSONSerialization.JSONObjectWithData(data, options: []) as? NSDictionary {            
        if let unsortedEvents = responseDictionary["data"]!["Events"] as? NSArray {
            let descriptor = NSSortDescriptor(key: "year", ascending: false, comparator: { (obj1, obj2) -> NSComparisonResult in
                if (obj1.integerValue > obj2.integerValue) {
                    return NSComparisonResult.OrderedDescending
                }
                if (obj1.integerValue < obj2.integerValue) {
                    return NSComparisonResult.OrderedAscending
                }
                
                return NSComparisonResult.OrderedSame
                
            })
            let events: NSArray = unsortedEvents.sortedArrayUsingDescriptors([descriptor])
            
            
            for i in 0 ..< events.count {
                var dictResult = events.objectAtIndex(i) as! NSDictionary
            }
        }                      
        let events2 = Event.getEventObjectsWithDictionary(responseDictionary, type: Type.EVENT)
        let births = Event.getEventObjectsWithDictionary(responseDictionary, type: Type.BIRTH)
        let deaths = Event.getEventObjectsWithDictionary(responseDictionary, type: Type.DEATH)
        completion(events: events2, births: births, deaths: deaths)
        return
      }
    }
    
    completion(events: nil, births: nil, deaths: nil)
});
task.resume()
}
`}
          </SyntaxHighlighter>

          <h6>Sprint #1: Swipeable View to Switch Days</h6>

          <p>
            The first component I worked on was a swipeable view to switch
            between different days on the main screen. This SwipeView would be
            the main part of the app, as people would most likely navigate
            through days this way.
          </p>

          <p>
            This component would also have to pass in the data for the calendar
            and load different data based on the day the user is on.
          </p>

          <p>
            After adding in lifecycle methods, adding in the data from our
            HistoryClient, and importing a base swipe view component I was able
            to get the Swipe View functioning. The code is a bit long, so if
            you're interested in seeing the code for the component,{" "}
            <a href="https://github.com/browne0/FactsOfToday/blob/master/FactsOfToday/FactsOfToday/SwipeViewController.swift">
              you can view it on Github.
            </a>
          </p>

          <p>At the end of the first sprint, we made awesome progress:</p>
          <div className="container">
            <img
              src={this.state.project.image_urls.screenshots[4]}
              alt="Sprint #1 result"
            />
          </div>

          <h6>
            Sprint #2: Adding Local App Notifications, and a Web View to
            Wikipedia
          </h6>

          <p>
            This sprint was the most challenging part of the project. We quickly
            found out that you can't implement automatic push notifications
            without a pre-configured web server. To work around this, we
            implemented the solution via iOS's Local Notification System.
          </p>

          <p>
            In order to get the notifications working, we needed to make sure
            that our AppDelegate (our class to handle all application states)
            was notified whenever someone changed the notification settings.
          </p>

          <p>
            This required that we have two functions: scheduleNotification, and
            getCachedMessage.
          </p>

          <p>
            To schedule the notification, we use the{" "}
            <a href="https://developer.apple.com/documentation/foundation/nsuserdefaults">
              NSUserDefaults
            </a>{" "}
            class to check for a specific notification key that we set. Once
            that is done, all we need to do is provide the information that the{" "}
            <a href="https://developer.apple.com/documentation/uikit/uilocalnotification">
              UILocalNotification
            </a>{" "}
            needs to create the notification:
          </p>

          <SyntaxHighlighter language="swift" showLineNumbers style={obsidian}>
            {`func scheduleNotification() {
let defaults = NSUserDefaults.standardUserDefaults()

//User has turned on notifications
if defaults.objectForKey(SettingsViewController.notificationKey) != nil &&
  defaults.boolForKey(SettingsViewController.notificationKey) {
  
  let formatter = NSDateFormatter()
  formatter.locale = NSLocale(localeIdentifier: "en_US_POSIX")
  formatter.timeZone = NSTimeZone.defaultTimeZone()
  formatter.dateFormat = "H:m"
  
  let calendar = NSCalendar(calendarIdentifier: NSCalendarIdentifierGregorian)
  let currentTime = NSDate()
  
  
  //Compare the current time and notification time to see if the notification should be scheduled for the next day
  let notificationTimeString = defaults.stringForKey(SettingsViewController.notificationTime)!
  let notificationTime = formatter.dateFromString(notificationTimeString)!
  
  let currentComponents = calendar?.components([.Hour, .Minute], fromDate: currentTime)
  let notificationComponents = calendar?.components([.Hour, .Minute], fromDate: notificationTime)
  
  let truncatedCurrent = calendar?.dateFromComponents(currentComponents!)
  let truncatedNotification = calendar?.dateFromComponents(notificationComponents!)
  
  let result = truncatedCurrent?.compare(truncatedNotification!)
  
  var addDay: Bool
  //Current time is earlier in the day than the notification
  if result == NSComparisonResult.OrderedAscending {
    addDay = false
    
    //Current time is equal to or later than the notification
  } else {
    addDay = true
  }
  
  
  
  let hourMinute = notificationTimeString.characters.split{$0 == ":"}.map(String.init)
  
  let gregorian = NSCalendar(calendarIdentifier: NSCalendarIdentifierGregorian)
  let components = gregorian!.components([.Year, .Month, .Day, .Hour, .Minute], fromDate: currentTime)
  components.setValue(Int(hourMinute[0])!, forComponent: NSCalendarUnit.Hour)
  components.setValue(Int(hourMinute[1])!, forComponent: NSCalendarUnit.Minute)
  var timeToFire = gregorian!.dateFromComponents(components)
  
  if addDay {
    timeToFire = calendar?.dateByAddingUnit(.Day, value: 1, toDate: timeToFire!, options: NSCalendarOptions(rawValue: 0))
  }
  
  let notification = UILocalNotification()
  notification.alertBody = getCachedMessage()
  notification.fireDate = timeToFire
  notification.soundName = UILocalNotificationDefaultSoundName
  notification.timeZone = NSTimeZone.defaultTimeZone()
//notification.repeatInterval = NSCalendarUnit.Day
  UIApplication.sharedApplication().scheduleLocalNotification(notification)
}

}
`}
          </SyntaxHighlighter>

          <p>
            Now, all we have to do is declare the actual notification that would
            be sent to the user. We thought it'd be cute to send personalized
            little messages like:
          </p>

          <ul>
            <li>
              Want to learn a cool new fact? Check out what interesting events
              happened today!
            </li>
            <li>
              Come and explore in{" "}
              <span style={style.title}>Facts of Today</span> to find out what
              interesting events happened today!
            </li>
            <li>
              It's about that time! Come and check out what different events
              happened today on <span style={style.title}>Facts of Today!</span>
            </li>
            <li>
              Ever wondered what happened today in history? Come find out on{" "}
              <span style={style.title}>Facts of Today!</span>
            </li>
            <li>
              Come and expand your knowledge of what happened today in history
              on <span style={style.title}>Facts of Today!</span>
            </li>
          </ul>

          <p>
            Loading the webview is as simple as passing the Wikipedia URL from
            our HistoryClient to iOS's web view. One of my teammates decided to
            work on adding the view for the calendar as well. Here's the result
            after our second sprint:
          </p>
          <div className="container">
            <img
              src={this.state.project.image_urls.screenshots[5]}
              alt="Sprint #2 result"
            />
          </div>

          <h6>Sprint #3: Adding the Color Scheme Delegate, and Map View</h6>

          <p>
            At this point, we had completed all of our basic requirements for{" "}
            <span style={style.title}>Facts of Today</span> and had some extra
            time to work on some of the extra user stories.
          </p>

          <p>
            The color scheme changer was my idea: as I love apps where I can
            customize it to the tee for myself. For this, all we had to do was
            declare which components would be part of the color scheme. We
            decided on:
          </p>

          <ul>
            <li>The text color</li>
            <li>The app bar color</li>
            <li>The tint color of the calendar.</li>
          </ul>

          <p>
            We defined 6 basic colors that{" "}
            <span style={style.title}>Facts of Today</span> could use and passed
            in the associated colors for that color scheme depending on which
            color the user chose.
          </p>

          <p>
            <b>It was that simple.</b> In our code, we define our collection
            view for the different color squares, and associate each square with
            a color:
          </p>

          <SyntaxHighlighter language="swift" showLineNumbers style={obsidian}>
            {`//  ColorSchemeViewController.swift
            
import UIKit

let ColorSchemeKey = "ColorSchemeKey"

class ColorSchemeViewController: UIViewController, UICollectionViewDelegate, UICollectionViewDataSource {
    @IBOutlet weak var collectionView: UICollectionView!
    var colors: [Int]!
    var delegate: ColorSchemeDelegate?

    override func viewDidLoad() {
        super.viewDidLoad()

        collectionView.delegate = self
        collectionView.dataSource = self
        
        colors = [Int]()
        colors.append(0x000000)
        colors.append(0x85AE26)
        colors.append(0xFB5144)
        colors.append(0x338acc)
        colors.append(0x936798)
        colors.append(0xe89726)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func collectionView(collectionView: UICollectionView, didSelectItemAtIndexPath indexPath: NSIndexPath) {
        let colorScheme = ColorScheme.getInstance()
        let nb = self.navigationController?.navigationBar

        colorScheme.setColorScheme(UIColor(netHex: colors[indexPath.row]), tintColor: UIColor.whiteColor(), titleColor: UIColor.whiteColor())
        colorScheme.alreadySet = false
        nb?.barTintColor = colorScheme.barTintColor
        nb?.titleTextAttributes = [NSForegroundColorAttributeName : colorScheme.titleColor]
        nb?.tintColor = colorScheme.tintColor
        NSUserDefaults.standardUserDefaults().setInteger(colors[indexPath.row], forKey: ColorSchemeKey)
    }
    
    func collectionView(collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return colors.count
    }
    
    func collectionView(collectionView: UICollectionView, cellForItemAtIndexPath indexPath: NSIndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCellWithReuseIdentifier("ColorCell", forIndexPath: indexPath)
        cell.backgroundColor = UIColor(netHex: colors[indexPath.row])
        
        return cell
    }
    
    func collectionView(collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAtIndexPath indexPath: NSIndexPath) -> CGSize {
        let numberOfCellInRow : Int = 2
        let collectionCellWidth : CGFloat = (self.view.frame.size.width/CGFloat(numberOfCellInRow))
        return CGSize(width: collectionCellWidth , height: collectionCellWidth)
    }
}

extension UIColor {
    convenience init(red: Int, green: Int, blue: Int) {
        assert(red >= 0 && red <= 255, "Invalid red component")
        assert(green >= 0 && green <= 255, "Invalid green component")
        assert(blue >= 0 && blue <= 255, "Invalid blue component")
        
        self.init(red: CGFloat(red) / 255.0, green: CGFloat(green) / 255.0, blue: CGFloat(blue) / 255.0, alpha: 1.0)
    }
    
    convenience init(netHex:Int) {
        self.init(red:(netHex >> 16) & 0xff, green:(netHex >> 8) & 0xff, blue:netHex & 0xff)
    }
}
`}
          </SyntaxHighlighter>

          <p>For the MapView, there were only a few simple things to do:</p>

          <ol>
            <li>
              Import{" "}
              <a href="https://developer.apple.com/documentation/mapkit">
                MapKit
              </a>
            </li>
            <li>
              Update our WebView if a Wikipedia URL had a location provided
            </li>
            <li>Place a pin at the coordinates of the location</li>
          </ol>

          <p>
            We also had to make sure the navigation bar knew if there was a
            location provided in the event, and update the UI accordingly. This
            was included in the Wikipedia API we had found.
          </p>

          <p>
            After a few tests, we got the MapView working just in time for the
            end of Sprint #3! Here is the result, <b>notice the color!</b>
          </p>
          <div className="container">
            <img
              src={this.state.project.image_urls.screenshots[6]}
              alt="Sprint #2 result"
            />
          </div>

          <p>
            After a couple of tweaks, and an idea to represent links as images
            so that the details section doesn't look like a wall of text, we
            finally reached our last iteration. Here's the final result:
          </p>

          <div className="container">
            <img
              src={this.state.project.image_urls.screenshots[0]}
              alt="Facts of Today"
            />
          </div>

          <p>
            We successfully deployed our application to the App Store as well
            and got a bunch of downloads.
          </p>

          <p>
            In order to do that we had to submit some screenshots, so I went
            into Photoshop and made some banners for our application on the App
            Store. Here are some of those banners:
          </p>
          <div className="container">
            <img
              src={this.state.project.image_urls.screenshots[1]}
              alt="Facts of Today"
            />
            <img
              src={this.state.project.image_urls.screenshots[2]}
              alt="Facts of Today"
            />
          </div>
          <div className="container">
            <img
              src={this.state.project.image_urls.screenshots[7]}
              alt="Facts of Today"
            />
            <img
              src={this.state.project.image_urls.screenshots[8]}
              alt="Facts of Today"
            />
          </div>
        </ProjectSection>
        <ProjectSection title="Project Challenges">
          <p>
            <span style={style.title}>Facts of Today</span> definitely
            solidified my interest in mobile development. The process of
            developing mobile apps is <b>completely</b> different from web
            applications, so I learned a lot. Deploying a mobile application in
            specific is a long process, and there are many places where your app
            can get rejected if you don't format your submission correctly.
          </p>

          <p>Some things that I struggled with initially were:</p>

          <ul>
            <li>Creating delegates to handle tasks for each component</li>
            <li>Working with UIPopover to get the calendar to load smoothly</li>
            <li>Implementing controller lifecycle methods</li>
            <li>Proper usage of NSURLSessionDataTask</li>
            <li>Component subscription to other components</li>
            <li>Building and deploying an app to the App Store</li>
          </ul>
        </ProjectSection>
      </ProjectPage>
    );
  }
}

export default FactsOfToday;
