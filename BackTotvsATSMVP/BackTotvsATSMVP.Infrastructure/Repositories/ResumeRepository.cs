using System;
using System.Threading.Tasks;
using Google.Cloud.Firestore;

namespace PayrollLoan.Management.Infrastructure.Repositories {

  public class ResumeRepository {

    private readonly FirestoreDb _db;
    
    public ResumeRepository () {
      _db = FirestoreDb.Create ("totvs-ats-mvp");
    }

    public async Task<ResumeDTO> GetAllResumesAsync () {
      CollectionReference collection = db.Collection ("resumes");
      QuerySnapshot querySnapshot = await query.GetSnapshotAsync ();
      foreach (DocumentSnapshot queryResult in querySnapshot.Documents) {
        string firstName = queryResult.GetValue<string> ("Name.First");
        Console.WriteLine ($"{firstName} {lastName}; born {born}");
      }
    }
  }
}